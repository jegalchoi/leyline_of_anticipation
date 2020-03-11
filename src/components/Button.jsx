import React from 'react'
import { Consumer } from '../context'
import PropTypes from 'prop-types'

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

Button.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  delta: PropTypes.string.isRequired
}
