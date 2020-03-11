import React, { Component } from 'react'

import THB from "./components/sets/THB.json"
import ELD from './components/sets/ELD.json'
import M20 from './components/sets/M20.json'
import WAR from './components/sets/WAR.json'
import RNA from './components/sets/RNA.json'
import GRN from './components/sets/GRN.json'

const MTGContext = React.createContext();

export class Provider extends Component {
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
      textOnly: false,
      textButton: 'Text Only Version'
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
  }
  handlePrepareCards = () => {
    const setSelectedFields = this.selectSet()
    const setRemovedDupes = this.setRemoveDupes(setSelectedFields)
    const setFiltered = this.setFilter(setRemovedDupes)
    const setFetchedImages = this.setFetchImages(setFiltered)
    this.setState({
      cards: setFetchedImages
    })
  }
  selectSet = () => {
    const set = this.state.library[this.state.set].cards
    // console.log(set)
    return set.map(card => (
      {
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
    ))
  }
  setRemoveDupes = setSelectedFields => (
    setSelectedFields.filter(card =>
      card.text !== undefined &&
      card.frameEffect !== "extendedart" &&
      card.frameEffect !== "inverted" &&
      card.frameEffect !== "showcase" &&
      card.hasFoil &&
      card.name !== "Ashiok's Forerunner"
    )
  )
  setFilter = setRemovedDupes => (
    setRemovedDupes.filter(card => 
      card.type === "Instant" || 
      card.text.includes("Flash")
    )
  )
  setFetchImages = setFiltered => (
    setFiltered.map(card => {
      fetch(card.link)
        .then(response => response.json())
        .then(json => json.image_uris.small)
        .then(json => {
          card.img = json
        })
      return card
    })
  )
  handleChangeCastingCost = (color, delta) => {
    this.setState(prevState => {
      let prevCastingCost = prevState.castingCost[color]
      let newState = { castingCost: { ...prevState.castingCost } }
      newState.castingCost[color] = prevCastingCost + delta
      return (prevCastingCost + delta === -1 ? null : newState)
    })
  }
  handleRefreshCards = () => {
    this.updateTotalCost()
    setTimeout(() => this.filterCards(), 10)
  }
  updateTotalCost = () => {
    this.setState(prevState => {
      let totalCost = prevState.totalCost
      totalCost = Object.values(prevState.castingCost).reduce((a, c) => a + c, 0)
      return { totalCost }
    })
  }
  filterCards = () => {
    this.setState(prevState => {
      const totalCost = prevState.totalCost
      let filteredCards = prevState.cards
      filteredCards = filteredCards.filter(card => 
        card.convertedManaCost <= totalCost && 
        this.filterCard(card.manaCost, prevState.castingCost)
      )
      return { filteredCards }
    })
  }
  filterCard = (manaCost, selectedCastingCost) => {
    const cardCastingCost = this.formatCardCastingCost(manaCost)
    return this.checkCost(cardCastingCost, selectedCastingCost)
  }
  formatCardCastingCost = manaCost => {
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
    return cardCastingCost
  }
  checkCost = (cardCastingCost, selectedCastingCost) => {
    let status = true
    for (const color in cardCastingCost) {
      if (cardCastingCost[color] != null && cardCastingCost[color] > selectedCastingCost[color]) {
        status = false
      }
    }
    return status
  }
  handleEnableTextOnly = () => {
    this.setState({
      textOnly: !this.state.textOnly,
      textButton: (this.state.textOnly ? 'Text Only Version' : 'Show Images')
    })
  }
  render() {
    return (
      <MTGContext.Provider value = {
        {
          castingCost: this.state.castingCost,
          totalCost: this.state.totalCost,
          library: this.state.library,
          set: this.state.set,
          cards: this.state.cards,
          filteredCards: this.state.filteredCards,
          textOnly: this.state.textOnly,
          textButton: this.state.textButton,
          actions: {
            showAllInstants: this.showAllInstants,
            setCards: this.handleSetCards,
            setSet: this.setSet,
            prepareCards: this.handlePrepareCards,
            selectSet: this.selectSet,
            setRemoveDupes: this.setRemoveDupes,
            setFilter: this.setFilter,
            setFetchImages: this.setFetchImages,
            changeCastingCost: this.handleChangeCastingCost,
            refreshCards: this.handleRefreshCards,
            updateTotalCost: this.updateTotalCost,
            filterCards: this.filterCards,
            filterCard: this.filterCard,
            checkCost: this.checkCost,
            enableTextOnly: this.handleEnableTextOnly
          }
        }
      }>
        { this.props.children }
      </MTGContext.Provider>
    )
  }
}

export const Consumer = MTGContext.Consumer;