import React from 'react'
import {MTGConsumer} from '../context'

export const Stats = ({ totalCost, count }) => {
  return (
    <MTGConsumer>
      {value => {
        <div className="row text-center text-uppercase border border-info rounded mx-auto my-2 p-3">
          <h1 className="col">Total Casting Cost: {value.totalCost}</h1>
          <h1 className="col">Total Possibilities: {value.count}</h1>
        </div>;
      }}
    </MTGConsumer>
  );
}
