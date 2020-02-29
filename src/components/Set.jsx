import React from 'react'

export const Set = ({ set, onChange }) => {
  return (
    <div>
      <label>{set}</label>
      <input
        type="radio"
        name="set"
        value={set}
        checked={set === { set }}
        onChange={e => onChange(e)}
      />
    </div>
  )
}