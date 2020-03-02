import React from 'react'

export const Stats = ({ totalCost, count }) => {
  return (
    <div>
      <h1>Total Casting Cost: {totalCost} - stats</h1>
      <h1>Total Possibilities: {count} - stats</h1>
    </div>
  );
}
