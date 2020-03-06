import React from 'react'
import { Card } from './Card'
import {ProductConsumer} from '../context'

export const CardsContainer = ({ set, cards, textEnabled }) => {
  console.log({cards})
  const array = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  }
  cards.forEach(card => (
    array[`${card.convertedManaCost}`].push(card)
  ));
  let arrayByCost = [];
  for (const cost in array) {
    arrayByCost = arrayByCost.concat(array[cost])
  }
  // console.log(arrayByCost);
  return (
    <div className='container row text-center'>
      {/* <h1>cards container</h1> */}
      {(cards.length === 0) ? 
        <h1>No cards were found.</h1> : 
        arrayByCost.map(card => 
          <Card
            card={card}
            set={set}
            textEnabled={textEnabled}
            key={card.number} 
          />
        )
      }
    </div>
  )
}
