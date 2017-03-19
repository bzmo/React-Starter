import React from 'react';

const Stats = ({minesCount, timer}) => {
  return (
    <div>
      <h5> Mines Left: { minesCount } </h5>
      <h5> Time: { timer }</h5>
    </div>
  )
}

export default Stats;
