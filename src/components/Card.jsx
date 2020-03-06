import React from 'react'
// import Test from './test.jpg'
import * as THB from './images/THB'
import * as ELD from "./images/ELD"
import * as M20 from './images/M20'

export const Card = ({ card, set, textEnabled }) => {
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
    <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
      <div className="card">
        <div className="container p-1">
          {/* <h1>{card.name} - card</h1> */}
          {textEnabled ? (
            <div>
              <p>
                {card.name} {card.manaCost}
              </p>
              <p>{card.type}</p>
              <h7>{card.text}</h7>
            </div>
          ) : (
            <img
              className="card-img-top"
              src={sets[`${set}`][`${set}${card.number}`]}
              alt={card.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
