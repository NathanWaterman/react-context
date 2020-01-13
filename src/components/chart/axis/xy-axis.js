import React from 'react';
import Axis from './axis';

const XYAxis = ({ xScale, yScale, height}) => {
  const xSettings = {
    scale: xScale,
    orient: 'bottom',
    ticks: 10,
    transform: `translate(0, ${height})`
  };
  const ySettings = {
    scale: yScale,
    orient: 'left',
    transform: 'translate(0, 0)'
  };
  return (
    <g className="axis-group">
      <Axis {...xSettings} />
      <Axis {...ySettings} />
    </g>
  );
};

export default XYAxis;