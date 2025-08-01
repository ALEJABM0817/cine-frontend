import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/index.scss';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" />
  </React.StrictMode>
);
