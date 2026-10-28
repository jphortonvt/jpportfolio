import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@ruled/design-system/styles.css';
import './styles/site.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
