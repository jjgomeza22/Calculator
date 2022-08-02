import React, { useState, useEffect } from 'react'
import { CalculatorMenu } from '../components/CaculatorMenu';
import { ContainerButtons } from '../components/ContainerButtons';
import { Display } from '../components/Display';
import { AppContext } from '../context/AppContext';
import HistoryIcon from '@mui/icons-material/History';
import CalculatorHistorial from '../components/CalculatorHistorial';
import { useLocalstorage } from '../hooks/UseLocalStorage';
import { CalculatorMemory } from '../components/CalculatorMemory';

import '../styles/CalculatorTemplate.css';

const CalculatorTemplate = () => {
  const {
    status,
    saveStorage
  } = useLocalstorage('RESULTS_V1', {
    storage: []
  });

  const [calculatorState, setCalculatorState] = useState({
    displayValue: '0',
    nextDisplayValue: '',
    nextDisplayActive: false,
    operation: '',
    isOperating: false,
    isEqual: false,
    calculatorMode: 'Estándar',
    drawerOn: false,
    fromHistorial: false
  });

  const showHistorial = () => {
    const newCalculatorState = {
      ...calculatorState,
      drawerOn: !calculatorState.drawerOn
    };
    setCalculatorState(newCalculatorState);
  };

  const cleanHistorial = () => {
    const newCalculatorState = {
      ...calculatorState,
      storage: []
    };
    saveStorage([]);
    setCalculatorState(newCalculatorState);
  };

  const saveLocalStorage = (toSave) => {
    saveStorage(toSave);
  };

  return (
    <AppContext.Provider value={[calculatorState, setCalculatorState]}>
      <div className='CalculatorTemplate-container'>
        <section className='CalculatorTemplate-menu'>
          <CalculatorMenu />
          <h2 className='CalculatorTemplate-menu-title'>Estándar</h2>
          <HistoryIcon
            className='CalculatorTemplate-history'
            onClick={showHistorial}
          />
        </section>
        <Display
          displayValue={calculatorState.displayValue}
          nextDisplayValue={calculatorState.nextDisplayValue}
        />
        <CalculatorMemory />
        <ContainerButtons
          saveLocalStorage={saveLocalStorage}
          myStorage={status.storage}
        />
        <CalculatorHistorial
          toOpen={calculatorState.drawerOn}
          showHistorial={showHistorial}
          cleanHistorial={cleanHistorial}
          storage={status.storage}
        />
      </div>
    </AppContext.Provider>
  )
};

export { CalculatorTemplate }