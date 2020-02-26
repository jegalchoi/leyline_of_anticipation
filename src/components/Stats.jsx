import React from 'react'

export const Stats = ({totalCost, filterCards}) => {
  return (
    <div>
      <h1 onChange={() => filterCards()}>
        STATS - {totalCost} -Total Cost
      </h1>
    </div>
  );
}
