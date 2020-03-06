import React from 'react'
import {ToggleButton, ButtonGroup, Button } from 'react-bootstrap'

export const Set = ({ set, onChange, selectedSet }) => {
  // console.log(set)
  return (
    <ButtonGroup toggle className='mb-3'>
      <ToggleButton
        className='font-weight-bold'
        value={set}
        type="radio"
        name="set"
        checked={set === selectedSet}
        onChange={e => onChange(e)}
      >
        {set}
      </ToggleButton>
    </ButtonGroup>
  )
}