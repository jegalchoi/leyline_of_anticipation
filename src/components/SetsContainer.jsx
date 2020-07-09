import React from 'react'
import { Consumer } from '../context'
import { Set } from './Set'

export const SetsContainer = () => {
  return (
    <Consumer>
      {({ library }) => {
        const sets = Object.keys(library)

        return (
          <div className='d-flex flex-column rounded border border-info p-2 m-4 text-center'>
            <div className='text-center display-6 m-3'>
              <p>Select a set.</p>
              <small className='text-muted'>
                The most recent set is chosen by default.
              </small>
            </div>
            {sets.map((set, idx) => (
              <Set set={set} key={idx} />
            ))}
          </div>
        )
      }}
    </Consumer>
  )
}
