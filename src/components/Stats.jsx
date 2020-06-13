import React from 'react'
import { Consumer } from '../context'

export const Stats = () => {
  return (
    <Consumer>
      {({ totalCost, filteredCards }) => {
        const count = filteredCards.length
        return (
          <div className='row text-center text-uppercase border border-info rounded mx-auto my-2 p-3'>
            <h1 className='col'>Total Casting Cost: {totalCost}</h1>
            <h1 className='col'>Total Possibilities: {count}</h1>
          </div>
        )
      }}
    </Consumer>
  )
}
