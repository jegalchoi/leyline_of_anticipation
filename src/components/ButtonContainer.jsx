import React from 'react'
import { Consumer } from '../context'
import { Button } from './Button'
import PropTypes from 'prop-types'

export const ButtonContainer = ({ color }) => {
  return (
    <Consumer>
      {({ castingCost, actions }) => {
        return (
          <div className='col-6 col-sm-2 btn-group-vertical p-3'>
            <div className='d-flex justify-content-center'>
              <img
                src={`https://res.cloudinary.com/diekjezbk/image/upload/mana%20symbols/${color}.png`}
                width='25%'
              />
            </div>
            <div className='container text-center mt-2'>
              <h3 className='font-weight-bold'>
                {castingCost[color]}
              </h3>
            </div>
            {['+', '-'].map((delta, idx) => (
              <Button
                color={color}
                title={delta}
                delta={`${delta}1`}
                key={idx}
              />
            ))}
          </div>
        )
      }}
    </Consumer>
  )
}

ButtonContainer.propTypes = {
  color: PropTypes.string.isRequired,
}
