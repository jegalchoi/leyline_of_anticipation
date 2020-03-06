import React from 'react'
import { Set } from './Set'

export const SetsContainer = ({ library, onChange, selectedSet }) => {
  const sets = Object.keys(library)
  return (
    <div className="d-flex flex-column rounded border border-info p-4 m-4">
      <h3 className='text-center display-6 m-3'>Select a set.  The newest set is chosen by default.</h3>
      {/* <ButtonGroup toggle className="mb-3"> */}
        {sets.map((set, idx) => (
          <Set set={set} onChange={onChange} key={idx} selectedSet={selectedSet} />
        ))}
      {/* </ButtonGroup> */}
    </div>
  )
}
