import React from 'react'

export const Card = ({card}) => {
  console.log(card.img)
  return (
    <div>
      <h1>{card.name} - card</h1>
      {/* <img src={card.img} alt={card.name} /> */}
    </div>
  )
}
