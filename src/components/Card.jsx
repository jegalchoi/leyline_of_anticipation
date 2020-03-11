import React from 'react'
import { Consumer } from '../context'
import * as THB from './images/THB'
import * as ELD from "./images/ELD"
import * as M20 from './images/M20'
import PropTypes from 'prop-types'

export const Card = ({ card }) => {
  return (
    <Consumer>
      { ({ set, textOnly }) => {
        const sets = 
          {
            THB: THB,
            ELD: ELD,
            M20: M20,
            // WAR: WAR,
            // RNA: RNA,
            // GRN: GRN
          }

        return (
          <div className="col-9 col-lg-3 col-md-6 mx-auto my-3">
            <div className="card">
              <div className="container p-1">
                { textOnly ? (
                  <div>
                    <h5>{card.name} {card.manaCost}</h5>
                    <h5>{card.type}</h5>
                    <p>{card.text}</p>
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
        )
      }}
    </Consumer>
  )
}

Card.propTypes = {
  card: PropTypes.object.isRequired
}
