import React from 'react'
import { Consumer } from '../context'
import { Set } from './Set'

export const SetsContainer = () => {
  return (
    <Consumer>
      {({ library }) => {
        const sets = Object.keys(library)

        return (
          <div className='d-flex flex-column rounded border border-info p-2 m-4'>
            <h3 className='text-center display-6 m-3'>
              Select a set. The newest set is chosen by default.
            </h3>
            {sets.map((set, idx) => (
              <Set set={set} key={idx} />
            ))}
          </div>
        )
      }}
    </Consumer>
  )
}
