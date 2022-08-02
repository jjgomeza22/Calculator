import React from 'react';
import { CalculatorButton } from './CalculatorButton';
import { numbers, operators, otherOperators } from '../configuration/elements';
import '../styles/ContainerButtons.css';

const ContainerButtons = ({
  saveLocalStorage,
  myStorage
}) => {

  return (
    <div className='ContainerButtons-container'>
      {numbers.map(nb => {
        return (
          <CalculatorButton
            key={'number: ' + nb.number}
            symbol={nb.number}
            name={nb.name}
            value={nb.value}
          />
        );
      })}
      {operators.map(op => {
        return (
          <CalculatorButton
            key={'operator: ' + op.symbol}
            symbol={op.symbol}
            name={op.name}
            value={op.value}
            color={op.color}
            saveLocalStorage={saveLocalStorage}
            myStorage={myStorage}
          />
        );
      })}
      {otherOperators.map(otherOp => {
              return (
                <CalculatorButton
                  key={'OtherOperator: ' + otherOp.symbol}
                  symbol={otherOp.symbol}
                  name={otherOp.name}
                  value={otherOp.value}
                  color={otherOp.color}
                />
              );
            })}
    </div>
  );
};

export { ContainerButtons };