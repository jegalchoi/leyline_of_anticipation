import React from 'react'
import { Consumer } from '../context'
import { Card } from './Card'

export const CardsContainer = () => {  
  return (
    <Consumer>
      { ({ filteredCards, set }) => {
        const array = 
          {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
          }

        filteredCards.forEach(card => (
          array[`${card.convertedManaCost}`].push(card)
        ))

        let arrayByCost = [];
        for (const cost in array) {
          arrayByCost = arrayByCost.concat(array[cost])
        }

        return (
          <div className='container row text-center'>
            {
              (filteredCards.length === 0) ?
              <h1>No cards were found.</h1> :
              arrayByCost.map(card =>
                <Card
                  card={card}
                  key={card.number}
                />
              )
            }
          </div>    
        )
      }}
    </Consumer>
  )
}
