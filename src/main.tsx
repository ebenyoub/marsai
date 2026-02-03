import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>
);
