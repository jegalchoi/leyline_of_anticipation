import React from 'react'

export const Button = ({ color, title, delta, changeCastingCost, refreshCards }) => {
  return (
    <button className='btn btn-secondary text-nowrap font-weight-bold my-1' onClick={() => {
      changeCastingCost(color, +delta)
      refreshCards()
      }} >
      {title}
    </button>
  );
}
