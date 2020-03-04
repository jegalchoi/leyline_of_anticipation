import React from 'react'
import { Set } from './Set'

import { Col, ButtonGroup } from "react-bootstrap"
import { Button } from "./Button"

export const SetsContainer = ({ library, onChange, defaultSet }) => {
  const sets = Object.keys(library)
  return (
    <div className="d-flex flex-column mb-5 rounded border border-info pb-5 m-5">
      <h3 className='text-center display-6 m-5'>Select a set.  The latest set is chosen by default.</h3>
      
        {sets.map((set, idx) => (
          <Set set={set} onChange={onChange} key={idx} defaultSet={defaultSet} />
        ))}
      
    </div>
  );
}
