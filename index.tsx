import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Se houver

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Elemento 'root' não encontrado no HTML!");
}
