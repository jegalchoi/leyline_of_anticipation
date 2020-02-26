import React from 'react'

export const Button = ({ color, title, delta, changeCastingCost, refreshCards }) => {
  return (
    <button onClick={() => {
      changeCastingCost(color, +delta)
      refreshCards()
      }} >
      {color} {title}
    </button>
  );
}
