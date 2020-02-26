import React, { Component } from 'react'
import { CardsContainer } from './CardsContainer'
import { ButtonContainer } from './ButtonContainer'
import { Stats } from './Stats'
import THB from "./sets/THB.json"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      castingCost: {
        Colorless: 0,
        Black: 0,
        Blue: 0,
        Green: 0,
        Red: 0,
        White: 0
      },
      cards:[],
      filteredCards: [],
      totalCost: 0
    }
  }
  componentDidMount() {
    const set = THB.cards
    const setSelectedFields = set.map(card => {
      return {
      name: card.name,
      type: card.type,
      text: card.text,
      frameEffect: card.frameEffect,
      colors: card.colors,
      convertedManaCost: card.convertedManaCost,
      manaCost: card.manaCost,
      link: `https://api.scryfall.com/cards/${card.scryfallId}`,
      number: card.number,
    }})
    const setRemovedDupes = 
      setSelectedFields.filter(card => 
        card.text !== undefined &&
        card.frameEffect !== "extendedart" &&
        card.frameEffect !== "inverted"
      )
    const setFiltered = setRemovedDupes.filter(card => card.type === "Instant" || card.text.includes("Flash"))

    const setFetchedImages = setFiltered.map(card => {
      fetch(card.link)
        .then(response => response.json())
        .then(json => json.image_uris.small)
        .then(json => { (card.img = json) })
      return card
    })
    this.setState({
      cards: setFetchedImages
    })
  }
  handleChangeCastingCost = (color, delta) => {
    this.setState(prevState => {
      let prevCastingCost = prevState.castingCost[color]
      // console.log(prevCastingCost)
      let newState = { castingCost: { ...prevState.castingCost } }
      // console.log(newState)
      newState.castingCost[color] = prevCastingCost + delta
      // console.log(newState.castingCost)
      return newState
    })
    // console.log(this.state.castingCost)
  }
  handleUpdateTotalCost = () => {
    this.setState(prevState => {
      let totalCost = prevState.totalCost
      totalCost = Object.values(prevState.castingCost).reduce((a, c) => a + c, 0)
      return { totalCost }
    })
  }
  handleFilterCards = () => {
    const totalCost = this.state.totalCost
    this.setState(prevState => {
      let cards = prevState.cards
      // cards = cards.map(card => card.convertedManaCost)
      cards = cards.filter(card => card.convertedManaCost <= totalCost)
      console.log(cards)
      return { filteredCards: cards }
    })
  }
  handleRefreshCards = () => {
    this.handleUpdateTotalCost()
    setTimeout(() => this.handleFilterCards(), 10)
  }
  render() {
    return (
      <div>
        <Stats
          totalCost={this.state.totalCost}
          filterCards={this.handleFilterCards}
        />
        <button>STATE</button>
        <h1>{this.state.totalCost}</h1>
        {["Colorless", "Black", "Blue", "Green", "Red", "White"].map(
          (color, idx) => (
            <ButtonContainer
              color={color}
              cost={this.state.castingCost[color]}
              changeCastingCost={this.handleChangeCastingCost}
              refreshCards={this.handleRefreshCards}
              key={idx}
            />
          )
        )}
        <CardsContainer cards={this.state.filteredCards} />
      </div>
    );
  }
}
