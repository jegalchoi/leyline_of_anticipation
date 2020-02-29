import React from 'react'
import { Set } from './Set'

export const SetsContainer = ({ library, onChange }) => {
  const sets = Object.keys(library)
  return (
    <div>
      {sets.map((set, idx) => <Set set={set} onChange={onChange} key={idx} />)}
    </div>
  )
}
