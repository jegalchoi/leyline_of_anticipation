import React, { Component } from 'react'
import { Container, Row, Col } from "react-bootstrap"

import { CardsContainer } from './CardsContainer'
import { ButtonContainer } from './ButtonContainer'
import { SetsContainer } from './SetsContainer'
import { Stats } from './Stats'
import THB from "./sets/THB.json"
import ELD from './sets/ELD.json'
import M20 from './sets/M20.json'
import WAR from './sets/WAR.json'
import RNA from './sets/RNA.json'
import GRN from './sets/GRN.json'

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
        M20: M20,
        WAR: WAR,
        RNA: RNA,
        GRN: GRN,
      },
      set: 'THB',
      cards: [],
      filteredCards: [],
    }
  }
  componentDidMount() {
    this.showAllInstants()
  }
  showAllInstants = () => {
    this.handlePrepareCards()
    setTimeout(() => this.setState({
      filteredCards: this.state.cards
    }), 10)
  }
  handleSetCards = e => {
    this.setSet(e)
    setTimeout(() => this.showAllInstants(), 10)
  }
  setSet = e => {
    // console.log(e.target.value)
    this.setState({
      castingCost: {
        Colorless: 0,
        Black: 0,
        Blue: 0,
        Green: 0,
        Red: 0,
        White: 0
      },
      totalCost: 0,
      set: e.target.value,
      cards: [],
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
    console.log(set)
    return set.map(card => {
      return {
        name: card.name,
        type: card.type,
        text: card.text,
        colors: card.colors,
        convertedManaCost: card.convertedManaCost,
        manaCost: card.manaCost,
        number: card.number,
        link: `https://api.scryfall.com/cards/${card.scryfallId}`,
        frameEffect: card.frameEffect,
        hasFoil: card.hasFoil,
      }
    })
  }
  setRemoveDupes = setSelectedFields => {
    // console.log(setSelectedFields)
    return setSelectedFields.filter(
      card =>
        card.text !== undefined &&
        card.frameEffect !== "extendedart" &&
        card.frameEffect !== "inverted" &&
        card.frameEffect !== "showcase" &&
        card.hasFoil &&
        card.name !== "Ashiok's Forerunner"
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
      return (prevCastingCost + delta === -1 ? null : newState)
    })
    // console.log(this.state.castingCost)
  }
  handleRefreshCards = () => {
    this.updateTotalCost()
    setTimeout(() => this.filterCards(), 10)
  }
  updateTotalCost = () => {
    this.setState(prevState => {
      let totalCost = prevState.totalCost
      totalCost = Object.values(prevState.castingCost).reduce((a, c) => a + c, 0)
      // console.log(totalCost)
      return { totalCost }
    })
  }
  filterCards = () => {
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
    console.log(manaCost)
    let cardCastingCost = {};
    [
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
    console.log(cardCastingCost)
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
  render() {
    return (
      <div>
        {/* <button onClick={() => console.log(this.state)}>STATE</button> */}
        <SetsContainer
          library={this.state.library}
          onChange={this.handleSetCards}
          defaultSet={this.state.set}
        />
        <div className="container border rounded border-info">
          <div className="container text-center display-6 m-4">
            Use the bottons to set the opponent's available mana. All
            possible instant-speed tricks are shown by default.
          </div>
          <div className="row bg-info">
            {["Colorless", "Black", "Blue", "Green", "Red", "White"].map(
              (color, idx) => (
                // <div className="col-sm-6">
                  <ButtonContainer
                    color={color}
                    cost={this.state.castingCost[color]}
                    changeCastingCost={this.handleChangeCastingCost}
                    refreshCards={this.handleRefreshCards}
                    key={idx}
                  />
                // </div>
              )
            )}
          </div>
        </div>
        <Stats
          totalCost={this.state.totalCost}
          count={this.state.filteredCards.length}
        />
        <CardsContainer set={this.state.set} cards={this.state.filteredCards} />
      </div>
    );
  }
}
