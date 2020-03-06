import React, { Component } from 'react'
import THB from "./components/sets/THB.json";
import ELD from "./components/sets/ELD.json";
import M20 from "./components/sets/M20.json";
import WAR from "./components/sets/WAR.json";
import RNA from "./components/sets/RNA.json";
import GRN from "./components/sets/GRN.json";

const { Provider, Consumer } = React.createContext();

class MTGProvider extends Component {
  state = {
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
      GRN: GRN
    },
    set: "THB",
    cards: [],
    filteredCards: [],
    textOnly: false
  }
  render() {
    return (
      <Provider
        value={{
          ...this.state
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { MTGProvider, Consumer as MTGConsumer }