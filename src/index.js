import React from 'react';
import { createRoot } from 'react-dom/client';
import { Calculator } from './pages/Calculator';
import './styles/main.css';

const root = createRoot(document.getElementById('app'));
root.render(
    <React.StrictMode>
        <Calculator />
    </React.StrictMode>
);