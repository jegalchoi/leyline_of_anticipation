import React, { Component } from 'react'
import THB from './components/sets/THB.json'
import ELD from './components/sets/ELD.json'
import M20 from './components/sets/M20.json'
import WAR from './components/sets/WAR.json'
import RNA from './components/sets/RNA.json'
import GRN from './components/sets/GRN.json'

const MTGContext = React.createContext()

export class Provider extends Component {
  state = {
    castingCost: {
      Colorless: 0,
      Black: 0,
      Blue: 0,
      Green: 0,
      Red: 0,
      White: 0,
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
    selectedSet: 'THB',
    cards: [],
    filteredCards: [],
    isFiltering: false,
    textOnly: false,
    textButton: 'Text Only Version',
  }
  componentDidMount() {
    this.showAllInstants()
  }
  showAllInstants = () => {
    this.handlePrepareCards()
    setTimeout(
      () =>
        this.setState({
          filteredCards: this.state.cards,
          isFiltering: false,
        }),
      1
    )
  }
  handleSetCards = (e) => {
    this.setSet(e)
    setTimeout(() => this.showAllInstants(), 1)
  }
  setSet = (e) => {
    e.preventDefault()

    this.setState({
      castingCost: {
        Colorless: 0,
        Black: 0,
        Blue: 0,
        Green: 0,
        Red: 0,
        White: 0,
      },
      totalCost: 0,
      selectedSet: e.target.value,
      cards: [],
      filteredCards: [],
      isFiltering: true,
    })
  }
  handlePrepareCards = () => {
    const selectedFieldsFromSet = this.selectFieldsFromSet()
    const removedDupesFromSet = this.removeDupesFromSet(
      selectedFieldsFromSet
    )
    const filteredInstantsFromSet = this.filterInstantsFromSet(
      removedDupesFromSet
    )
    const fetchedImagesForCards = this.fetchImagesForCards(
      filteredInstantsFromSet
    )
    this.setState({
      cards: fetchedImagesForCards,
      isFiltering: true,
    })
  }
  selectFieldsFromSet = () => {
    const set = this.state.library[this.state.selectedSet].cards
    return set.map((card) => ({
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
    }))
  }
  removeDupesFromSet = (selectedFieldsFromSet) =>
    selectedFieldsFromSet.filter(
      (card) =>
        card.text !== undefined &&
        card.frameEffect !== 'extendedart' &&
        card.frameEffect !== 'inverted' &&
        card.frameEffect !== 'showcase' &&
        card.hasFoil &&
        card.name !== "Ashiok's Forerunner"
    )
  filterInstantsFromSet = (removedDupesFromSet) =>
    removedDupesFromSet.filter(
      (card) => card.type === 'Instant' || card.text.includes('Flash')
    )
  fetchImagesForCards = (filteredInstantsFromSet) =>
    filteredInstantsFromSet.map((card) => {
      fetch(card.link)
        .then((response) => response.json())
        .then((json) => json.image_uris.small)
        .then((json) => {
          card.img = json
        })
      return card
    })
  handleChangeCastingCost = (color, delta) => {
    this.setState((prevState) => {
      let prevCastingCost = prevState.castingCost[color]
      let newState = { castingCost: { ...prevState.castingCost } }
      newState.castingCost[color] = prevCastingCost + delta
      return newState
    })
  }
  handleRefreshCards = () => {
    this.updateTotalCost()
    setTimeout(
      () =>
        this.state.totalCost === 0
          ? this.showAllInstants()
          : this.loadCards(),
      10
    )
  }
  updateTotalCost = () => {
    this.setState((prevState) => {
      let totalCost = prevState.totalCost
      totalCost = Object.values(prevState.castingCost).reduce(
        (a, c) => a + c,
        0
      )
      return { totalCost }
    })
  }
  loadCards = () => {
    this.setState((prevState) => {
      const totalCost = prevState.totalCost
      let filteredCards = prevState.cards
      filteredCards = filteredCards.filter(
        (card) =>
          card.convertedManaCost <= totalCost &&
          this.filterCard(card.manaCost, prevState.castingCost)
      )
      return { filteredCards }
    })
  }
  filterCard = (manaCost, selectedCastingCost) => {
    const cardCastingCost = this.formatCardCastingCost(manaCost)
    return this.compareCost(cardCastingCost, selectedCastingCost)
  }
  formatCardCastingCost = (manaCost) => {
    let cardCastingCost = {}
    ;[
      ['Black', /B/g],
      ['Blue', /U/g],
      ['Green', /G/g],
      ['Red', /R/g],
      ['White', /W/g],
    ].forEach((color) => {
      if (manaCost.match(color[1]) == null) {
        cardCastingCost[color[0]] = 0
      } else {
        cardCastingCost[color[0]] = manaCost.match(color[1]).length
      }
    })
    return cardCastingCost
  }
  compareCost = (cardCastingCost, selectedCastingCost) => {
    let status = true
    for (const color in cardCastingCost) {
      if (
        cardCastingCost[color] != null &&
        cardCastingCost[color] > selectedCastingCost[color]
      ) {
        status = false
      }
    }
    return status
  }
  handleEnableTextOnly = () => {
    this.setState({
      textOnly: !this.state.textOnly,
      textButton: this.state.textOnly
        ? 'Show Text Only Version'
        : 'Show Card Images',
    })
  }
  render() {
    return (
      <MTGContext.Provider
        value={{
          castingCost: this.state.castingCost,
          totalCost: this.state.totalCost,
          library: this.state.library,
          selectedSet: this.state.selectedSet,
          cards: this.state.cards,
          filteredCards: this.state.filteredCards,
          isFiltering: this.state.isFiltering,
          textOnly: this.state.textOnly,
          textButton: this.state.textButton,
          actions: {
            showAllInstants: this.showAllInstants,
            setCards: this.handleSetCards,
            setSet: this.setSet,
            prepareCards: this.handlePrepareCards,
            selectFieldsFromSet: this.selectFieldsFromSet,
            removeDupesFromSet: this.removeDupesFromSet,
            filterInstantsFromSet: this.filterInstantsFromSet,
            fetchImagesForCards: this.fetchImagesForCards,
            changeCastingCost: this.handleChangeCastingCost,
            refreshCards: this.handleRefreshCards,
            updateTotalCost: this.updateTotalCost,
            loadCards: this.loadCards,
            filterCard: this.filterCard,
            compareCost: this.compareCost,
            enableTextOnly: this.handleEnableTextOnly,
          },
        }}
      >
        {this.props.children}
      </MTGContext.Provider>
    )
  }
}

export const Consumer = MTGContext.Consumer
