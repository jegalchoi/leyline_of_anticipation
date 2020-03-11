import React from 'react'
import { Consumer } from '../context'
import { Button } from "./Button"
import Colorless from './images/symbols/Colorless.png'
import Black from "./images/symbols/Black.png"
import Blue from "./images/symbols/Blue.png"
import Green from "./images/symbols/Green.png"
import Red from "./images/symbols/Red.png"
import White from "./images/symbols/White.png"
import PropTypes from 'prop-types'

export const ButtonContainer = ({ color }) => {
  return (
    <Consumer>
      { ({ castingCost, actions })=> {
        const colors = {
          Colorless: Colorless,
          Black: Black,
          Blue: Blue,
          Green: Green,
          Red: Red,
          White: White
        }
        return (
          <div className="col-lg-2 col-md-2 btn-group-vertical p-3">
            <div className="d-flex justify-content-center">
              <img src={colors[color]} width="25%" />
            </div>
            <div className="container text-center mt-2">
              <h3 className='font-weight-bold'>{castingCost[color]}</h3>
            </div>
            {["+", "-"].map((delta, idx) => (
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
  color: PropTypes.string.isRequired
}
