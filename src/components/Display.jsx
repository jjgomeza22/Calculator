import React from 'react';

import '../styles/Display.css';

const Display = ({
  displayValue,
  nextDisplayValue
}) => {
  return (
    <div className='Display-container-text'>
      <span className='Display-text next'>{nextDisplayValue}</span>
      <span className='Display-text'>{displayValue}</span>
    </div>
  )
};

export { Display };