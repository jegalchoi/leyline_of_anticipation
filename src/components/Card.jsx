import React from 'react'
// import Test from './test.jpg'
import * as THB from './images/THB'
import * as ELD from "./images/ELD"
import * as M20 from './images/M20'

export const Card = ({ card, set }) => {
  // console.log(card.img)

  const sets = {
    THB: THB,
    ELD: ELD,
    M20: M20,
    // WAR: WAR,
    // RNA: RNA,
    // GRN: GRN
  }
  
  return (
    <div>
      <h1>{card.name} - card</h1>
      <img src={sets[`${set}`][`${set}${card.number}`]} alt={card.name} />
    </div>
  );
}
