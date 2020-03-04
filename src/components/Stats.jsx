import React from 'react'

export const Stats = ({ totalCost, count }) => {
  return (
    <div className='container text-center border mx-auto my-2 p-3 row'>
      <h1 className='col'>Total Casting Cost: {totalCost}</h1>
      <h1 className='col'>Total Possibilities: {count}</h1>
    </div>
  );
}
