import React from 'react';

import '../styles/CalculatorMemory.css';

const CalculatorMemory = () => {
  return (
    <section className='CalculatorMemory-container'>
        <div className='CalculatorMemory-m gray'>MC</div>
        <div className='CalculatorMemory-m gray'>MR</div>
        <div className='CalculatorMemory-m'>M+</div>
        <div className='CalculatorMemory-m'>M-</div>
        <div className='CalculatorMemory-m'>MS</div>
        <div className='CalculatorMemory-m gray'>Mv</div>
    </section>
  );
};

export { CalculatorMemory };