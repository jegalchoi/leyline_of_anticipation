import React from 'react'
import { Card } from './Card'

export const CardsContainer = ({cards}) => {
  console.log({cards})
  return (
    <div>
      {/* <h1>cards container</h1> */}
      {(cards.length === 0) ? <h1>No cards were found.</h1> : cards.map(card => <Card card={card} key={card.number} />)}
    </div>
  )
}
