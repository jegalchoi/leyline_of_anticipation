import React from 'react'
import { Consumer } from '../context'

export const Button = ({ color, title, delta }) => {
  return (
    <Consumer>
      { context => (
        <button
          className='btn btn-secondary text-nowrap font-weight-bold my-1'
          onClick={() => {
            context.actions.changeCastingCost(color, +delta)
            context.actions.refreshCards()
          }} 
        >
          {title}
        </button>
      )}
    </Consumer>
  )
}
