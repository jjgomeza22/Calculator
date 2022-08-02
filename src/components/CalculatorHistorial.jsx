import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import DialogContent from '@mui/material/DialogContent';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { AppContext } from '../context/AppContext';

import '../styles/CalculatorHistorial.css';

export default function TemporaryDrawer({
  toOpen,
  showHistorial,
  cleanHistorial,
  storage
}) {

  const [calculatorState, setCalculatorState] = useContext(AppContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    showHistorial();
  };

  const setNewDisplay = (operation) => {
    const newCalculatorState = {
      ...calculatorState,
      displayValue: operation.result,
      nextDisplayValue: operation.operation,
      nextDisplayActive: true,
      drawerOn: !calculatorState.drawerOn,
      fromHistorial: true,
      isEqual: true
    };
    setCalculatorState(newCalculatorState);
  };

  const disp = storage.length == 0 ? 'none' : 'inline-block';
  const anchor = 'bottom'
  return (
    <Drawer
      anchor={anchor}
      open={toOpen}
      onClose={toggleDrawer(anchor, false)}
    >
      <DialogContent
        className='CalculatorHistorial-container'
        dividers={scroll === 'paper'}
        sx={{
          padding: '5px 5px',
          margin: '7px'
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: '14px'
          }}
        >
          {storage.length == 0 ?
            <span>Aún no hay historial</span> :
            storage.map(cal => {
              return (
                <li
                  onClick={() => {setNewDisplay(cal)}}
                  className='CalculatorHistorial-list'
                  key={'result: ' + cal.result + cal.operation}
                >
                  <span className='CalculatorHistorial-operation'>{cal.operation}</span>
                  <span className='CalculatorHistorial-result'>{cal.result}</span>
                </li>
              );
            })}
        </div>
      </DialogContent>
      <DeleteOutlineTwoToneIcon
        className='CalculatorHistorial-garbage'
        sx={{
          color: 'white',
          justifySelf: 'end',
          marginRight: '8px',
          display: `${disp}`
          }}
        onClick={() => {cleanHistorial()}}
        />
    </Drawer>
  );
}