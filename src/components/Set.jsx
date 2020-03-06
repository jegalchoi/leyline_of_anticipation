import React from 'react'
import {ToggleButton, ButtonGroup, Button } from 'react-bootstrap'

export const Set = ({ set, onChange, defaultSet }) => {
  // console.log(defaultSet)
  return (
    <ButtonGroup toggle className='mb-3'>
      <ToggleButton
        className='font-weight-bold'
        value={set}
        type="radio"
        name="set"
        checked={set === { set }}
        onChange={e => onChange(e)}
      >
        {set}
      </ToggleButton>
    </ButtonGroup>

    // <label className="btn btn-secondary btn-lg">
    //   <input
    //     type="radio"
    //     name="set"
    //     value={set}
    //     checked={set === { set }}
    //     onChange={e => onChange(e)}
    //   /> {set}
    // </label>
  )
}