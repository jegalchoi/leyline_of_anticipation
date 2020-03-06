import React from 'react'
import Colorless from './images/symbols/Colorless.png'
import Black from "./images/symbols/Black.png"
import Blue from "./images/symbols/Blue.png"
import Green from "./images/symbols/Green.png"
import Red from "./images/symbols/Red.png"
import White from "./images/symbols/White.png"

import { Col } from 'react-bootstrap'
import { Button } from "./Button"

export const ButtonContainer = ({ color, cost, changeCastingCost, refreshCards }) => {
  const colors = {
    Colorless: Colorless,
    Black: Black,
    Blue: Blue,
    Green: Green,
    Red: Red,
    White: White
  }
  return (
    // <Col className="bg-dark text-uppercase">
    <div className="col-4 btn-group-vertical p-3">
      {/* <h1>{color} container</h1> */}
      <div className="d-flex justify-content-center">
        <img src={colors[color]} width="25%" />
      </div>
      <div className="container text-center mt-2">
        <h3 className='font-weight-bold'>{cost}</h3>
      </div>
      {["+", "-"].map((delta, idx) => (
        <Button
          color={color}
          title={delta}
          delta={`${delta}1`}
          changeCastingCost={changeCastingCost}
          refreshCards={refreshCards}
          key={idx}
        />
      ))}
    </div>
    // </Col>
  );
}
