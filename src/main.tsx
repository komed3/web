import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';

import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';


createRoot( document.getElementById( 'root' )! ).render(
  <StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </StrictMode>
);
