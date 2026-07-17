import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// A forma mais segura para o Vite/Rollup processar o ponto de entrada
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
