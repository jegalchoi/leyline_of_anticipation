import React from 'react'
import { Button } from "./Button";

export const ButtonContainer = ({ color, cost, changeCastingCost, refreshCards }) => {
  return (
    <div>
      {/* <h1>{color} container</h1> */}
      <h3>{cost} cost</h3>
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
  );
}
