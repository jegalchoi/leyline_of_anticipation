import React from 'react'
import { Consumer } from '../context'
import { ToggleButton, ButtonGroup } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const Set = ({ set }) => {
  return (
    <Consumer>
      { ({ selectedSet, actions }) => (
        <ButtonGroup toggle className='mb-3'>
          <ToggleButton
            className='font-weight-bold'
            type="radio"
            name="set"
            value={set}
            checked={set === selectedSet}
            disabled={ set === selectedSet }
            onChange={e => actions.setCards(e)}
          >
            {set}
          </ToggleButton>
        </ButtonGroup>
      )}
    </Consumer>
  )
}

Set.propTypes = {
  set: PropTypes.string.isRequired,
}
