import React from 'react'
import { Card } from './Card'

export const CardsContainer = ({ set, cards, textEnabled }) => {
  console.log({cards})
  return (
    <div className='container text-center'>
      {/* <h1>cards container</h1> */}
      {(cards.length === 0) ? 
        <h1>No cards were found.</h1> : 
        cards.map(card => 
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
