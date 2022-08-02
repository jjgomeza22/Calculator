import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

import '../styles/Calculatorbutton.css';
import { AppContext } from '../context/AppContext';


const CalculatorButton = ({
  symbol,
  name,
  value,
  color,
  saveLocalStorage,
  myStorage
}) => {

  const equalStyle = symbol == '=' ? 'equal' : '';
  const blackButton = color == 'black' ? 'black' : '';

  const [calculatorState, setCalculatorState] = useContext(AppContext);
  const operators = ['+', '-', 'x', '÷'];

  const makeButtonAction = (val, sym) => {

    let newCaclculatorState;
    switch (sym) {
      case 'CE': {
        newCaclculatorState = {
          ...calculatorState,
          displayValue: '0'
        }
        break;
      }
      case 'C': {
        newCaclculatorState = {
          ...calculatorState,
          displayValue: '0',
          nextDisplayValue: '',
          operation: '',
          drawerOn: false,
          fromHistorial: false,
          isOperating: false,
          isEqual: false,
        }
        break;
      }
      case 'DEL': {
        let newDisplayValue = calculatorState.displayValue;
        if (newDisplayValue !== '0') {
          newDisplayValue = newDisplayValue.slice(0, newDisplayValue.length - 1);
          newCaclculatorState = {
            ...calculatorState,
            displayValue: newDisplayValue
          }
        }
        break;
      }
      case '+': {

        const resp = validateOperation(calculatorState, sym, val)
        newCaclculatorState = resp.newCaclculatorState;
        val = resp.val;
        break;
      }
      case '-': {
        const resp = validateOperation(calculatorState, sym, val)
        newCaclculatorState = resp.newCaclculatorState;
        val = resp.val;
        break;
      }
      case 'x': {
        const resp = validateOperation(calculatorState, sym, val)
        newCaclculatorState = resp.newCaclculatorState;
        val = resp.val;
        break;
      }
      case '÷': {
        const resp = validateOperation(calculatorState, sym, val)
        newCaclculatorState = resp.newCaclculatorState;
        val = resp.val;
        break;
      }
      case '=':{
        let newDisplayValue = calculatorState.displayValue;
        let newNextDisplayValue = calculatorState.nextDisplayValue;
        let newSymbol = calculatorState.operation;
        let newStorage = myStorage;
        let fromHistorial = calculatorState.fromHistorial;

        if (calculatorState.isEqual || calculatorState.fromHistorial) {
          newNextDisplayValue = newNextDisplayValue.slice(0, newNextDisplayValue.length - 1);
          for (let i = 0; i < newNextDisplayValue.length; i++) {
            if (operators.includes(newNextDisplayValue[i])) {
              newSymbol = newNextDisplayValue[i];
              break;
            }
          }

          const toOperate = newNextDisplayValue.split(newSymbol)[1];
          const toCalculate = `${newDisplayValue} ${newSymbol} ${toOperate}`
            .replace('x', '*')
            .replace('÷', '/')
            .replace(',', '.');
          const operation = eval(toCalculate).toString();
          newNextDisplayValue = `${newDisplayValue} ${newSymbol} ${toOperate} ${sym}`;
          newDisplayValue = `${operation}`;

          newStorage.unshift({
            operation:(toCalculate + ' ='),
            result: newDisplayValue
          });
        }
        else {
          let toCalculate = (newNextDisplayValue +' '+ newDisplayValue);
          newNextDisplayValue = `${toCalculate} ${sym}`;
          toCalculate = toCalculate
            .replace('x', '*')
            .replace('÷', '/')
            .replace(',', '.');
          const operation = eval(toCalculate).toString();
          newDisplayValue = `${operation}`;

          newStorage.unshift({
            operation:(toCalculate + ' ='),
            result: newDisplayValue
          });
        }
        saveLocalStorage(newStorage);

        newCaclculatorState = {
          ...calculatorState,
          displayValue: newDisplayValue,
          nextDisplayValue: newNextDisplayValue,
          isEqual: true,
          operation: newSymbol,
          fromHistorial: fromHistorial
        };
        break;
      }
      case '±': {
        let newDisplayValue = calculatorState.displayValue;

        if (newDisplayValue != 0 ) {
          if (calculatorState.operation == sym) {
            newDisplayValue = newDisplayValue.slice(1);
            sym = '';
          } else {
            newDisplayValue = `-${newDisplayValue}`;
          }
          newCaclculatorState = {
            ...calculatorState,
            displayValue: newDisplayValue,
            operation: sym,
          };
        }
        break;
      }
    }
    if (typeof newCaclculatorState === 'undefined') newCaclculatorState = calculatorState;
    setCalculatorState(newCaclculatorState);
    showButtonAtDisplay(val, newCaclculatorState);
  };

  const showButtonAtDisplay = (val, newCalculatorState) => {
    if (val != 'NA') {

      const dispValue = newCalculatorState.displayValue;
      let isDisplayActive = calculatorState.nextDisplayActive;
      let nextDisplayValue = newCalculatorState.nextDisplayValue;
      let isEqual = newCalculatorState.isEqual;

      let newDisplayValue;
      let newNextDisplayActive;

      if (dispValue === '0' || calculatorState.isEqual) {
        newDisplayValue = val;
        nextDisplayValue = calculatorState.isEqual ? '' : nextDisplayValue;
        isEqual = false;
      } else {
        newDisplayValue = isDisplayActive ? `${val}` : `${dispValue}${val}`;
        newNextDisplayActive = isDisplayActive ? false : newCalculatorState.nextDisplayActive;
      }

      const state = {
        ...newCalculatorState,
        displayValue: newDisplayValue,
        nextDisplayValue: nextDisplayValue,
        nextDisplayActive: newNextDisplayActive,
        isOperating: operators.includes(symbol) ? true : false,
        isEqual
      }
      setCalculatorState(state);
    }
  };

  const operateNumbers = (status, sym, val) => {
    let displayValue = status.displayValue;
    let nextDisplayValue = status.nextDisplayValue;
    let isOperating = status.isOperating;
    let fromHistorial = status.fromHistorial;
    let isEqual = status.isEqual;
    let newStorage = myStorage;

    if (nextDisplayValue === '' || fromHistorial || isEqual){
      nextDisplayValue = `${displayValue} ${sym}`;
      fromHistorial = false;
      isEqual = false;
      isOperating = false;
    } else {
      isOperating = true;

      const toCalculate = (nextDisplayValue + ' ' + displayValue)
        .replace('x', '*')
        .replace('÷', '/');
      const operation = eval(toCalculate).toString();
      displayValue = operation;
      nextDisplayValue = `${operation} ${sym}`;

      newStorage.unshift({
        operation:(toCalculate + ' ='),
        result: displayValue
      });
      saveLocalStorage(newStorage);
    }
    const newCaclculatorState = {
      ...status,
      displayValue: displayValue,
      nextDisplayValue: nextDisplayValue,
      nextDisplayActive: true,
      operation: sym,
      isOperating: isOperating,
      isEqual: isEqual,
      fromHistorial: fromHistorial
    };
    return {newCaclculatorState, val};
  }

  const validateOperation = (calculatorState, sym, val) => {
    let newCaclculatorState;
    debugger
    if (calculatorState.operation !== sym && calculatorState.isOperating)  {
      let newDisplayValue = calculatorState.nextDisplayValue;
      newDisplayValue = newDisplayValue.slice(0, newDisplayValue.length - 1) + sym;
      newCaclculatorState = {
        ...calculatorState,
        nextDisplayValue: newDisplayValue,
        operation: sym
      };
      val = 'NA';
    }
    else if (calculatorState.operation === sym && calculatorState.isOperating)  {
      val = 'NA';
    }
    else {
      const data = operateNumbers(calculatorState, sym, val)
      newCaclculatorState = data.newCaclculatorState;
      val = data.val;
    }
    return {newCaclculatorState, val};
  }

  return (
    <Button
      className={`CalculatorButton-button ${equalStyle} ${blackButton}`}
      variant="contained"
      style={{ gridArea: name }}
      onClick={() => { makeButtonAction(value, symbol) }}
    >
      {symbol == 'DEL' ?
        <BackspaceOutlinedIcon
          sx={{
            width: '38%'
          }}
        /> :
        symbol
      }
    </Button>
  )
};

export { CalculatorButton };