import React, { Component } from 'react'
import { CardsContainer } from './CardsContainer'
import { ButtonContainer } from './ButtonContainer'
import { Sets } from './Sets'
import THB from "./sets/THB.json"
import ELD from './sets/ELD.json'

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
      totalCost: 0,
      library: {
        THB: THB,
        ELD: ELD,
      },
      set: 'THB',
      cards: [],
      filteredCards: [],
    }
  }
  handleSetCards = e => {
    this.handleSetChange(e)
    setTimeout(() => this.handlePrepareCards(), 10)
  }
  handleSetChange = e => {
    // console.log(e.target.value)
    this.setState({
      set: e.target.value,
      castingCost: {
        Colorless: 0,
        Black: 0,
        Blue: 0,
        Green: 0,
        Red: 0,
        White: 0
      },
      totalCost: 0,
      filteredCards: [],
    })
    // console.log(this.state.set)
    // console.log(this.state.library[this.state.set])
  }
  handlePrepareCards = () => {
    const setSelectedFields = this.selectSet()
    const setRemovedDupes = this.setRemoveDupes(setSelectedFields)
    const setFiltered = this.setFilter(setRemovedDupes)
    const setFetchedImages = this.setFetchImages(setFiltered)
    this.setState({
      cards: setFetchedImages
    });
    // console.log(this.state)
  }
  selectSet = () => {
    const set = this.state.library[this.state.set].cards
    console.log(set);
    return set.map(card => {
      return {
        name: card.name,
        type: card.type,
        text: card.text,
        frameEffect: card.frameEffect,
        colors: card.colors,
        convertedManaCost: card.convertedManaCost,
        manaCost: card.manaCost,
        link: `https://api.scryfall.com/cards/${card.scryfallId}`,
        number: card.number
      }
    })
  }
  setRemoveDupes = setSelectedFields => {
    // console.log(setSelectedFields)
    return setSelectedFields.filter(
      card =>
        card.text !== undefined &&
        card.frameEffect !== "extendedart" &&
        card.frameEffect !== "inverted"
    )
  }
  setFilter = setRemovedDupes => {
    return setRemovedDupes.filter(
      card => card.type === "Instant" || card.text.includes("Flash")
    )
  }
  setFetchImages = setFiltered => {
    return setFiltered.map(card => {
      fetch(card.link)
        .then(response => response.json())
        .then(json => json.image_uris.small)
        .then(json => {
          card.img = json
        })
      return card
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
  handleFilterCards = () => {
    this.setState(prevState => {
      const totalCost = prevState.totalCost
      let cards = prevState.cards
      cards = cards.filter(card => card.convertedManaCost <= totalCost && this.filterCard(card.manaCost, prevState.castingCost))
      console.log(cards)
      return { filteredCards: cards }
    })
  }
  filterCard = (manaCost, selectedCastingCost) => {
    const cardCastingCost = this.formatCardCastingCost(manaCost)
    return this.checkCost(cardCastingCost, selectedCastingCost)
  }
  formatCardCastingCost = manaCost => {
    // console.log(manaCost)
    let cardCastingCost = {};
    [
      ["Colorless", /[1 - 9]/g],
      ["Black", /B/g],
      ["Blue", /U/g],
      ["Green", /G/g],
      ["Red", /R/g],
      ["White", /W/g]
    ].forEach(color => {
      if (manaCost.match(color[1]) == null) {
        cardCastingCost[color[0]] = 0
      } else {
        cardCastingCost[color[0]] = manaCost.match(color[1]).length
      }
    })
    // console.log(cardCastingCost)
    return cardCastingCost
  }
  checkCost = (cardCastingCost, selectedCastingCost) => {
    // console.log(cardCastingCost)
    // console.log(selectedCastingCost)
    let status = true
    for (const color in cardCastingCost) {
      // console.log(color)
      if (cardCastingCost[color] != null && cardCastingCost[color] > selectedCastingCost[color]) {
        status = false
      }
    }
    // console.log(status)
    return status
  }
  handleRefreshCards = () => {
    this.handleUpdateTotalCost()
    setTimeout(() => this.handleFilterCards(), 10)
  }
  handleUpdateTotalCost = () => {
    this.setState(prevState => {
      let totalCost = prevState.totalCost
      totalCost = Object.values(prevState.castingCost).reduce((a, c) => a + c, 0)
      // console.log(totalCost)
      return { totalCost }
    })
  }
  render() {
    return (
      <div>
        <Sets set={this.state.set} onChange={this.handleSetCards} />
        <button onClick={() => console.log(this.state)}>STATE</button>
        <h1>Total Casting Cost: {this.state.totalCost}</h1>
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
