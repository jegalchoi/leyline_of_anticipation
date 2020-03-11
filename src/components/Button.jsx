import React from 'react'
import { Consumer } from '../context'
import PropTypes from 'prop-types'

export const Button = ({ color, title, delta }) => {
  return (
    <Consumer>
      { ({ totalCost, castingCost, actions }) => (
        <button
          className='btn btn-secondary text-nowrap font-weight-bold my-1'
          disabled={delta === '-1' && castingCost[color] === 0}
          onClick={() => {
            actions.changeCastingCost(color, +delta)
            actions.refreshCards()
          }} 
        >
          {title}
        </button>
      )}
    </Consumer>
  )
}

Button.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  delta: PropTypes.string.isRequired
}
