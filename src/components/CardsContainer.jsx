import React from 'react'
import { Consumer } from '../context'
import { Card } from './Card'

export const CardsContainer = () => {
  return (
    <Consumer>
      {({ cards, filteredCards, isFiltering }) => {
        const array = {
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
          9: [],
          10: [],
        }

        filteredCards.forEach((card) => {
          array[`${card.convertedManaCost}`].push(card)
        })

        let arrayByCost = []
        for (const cost in array) {
          arrayByCost = [...arrayByCost, ...array[cost]]
        }

        return (
          <div className='container row'>
            {isFiltering && filteredCards.length === 0 && (
              <h1>LOADING...</h1>
            )}
            {!isFiltering && filteredCards.length === 0 ? (
              <h1>No cards were found.</h1>
            ) : (
              arrayByCost.map((card) => (
                <Card card={card} key={card.name} />
              ))
            )}
          </div>
        )
      }}
    </Consumer>
  )
}
