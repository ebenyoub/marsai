import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import './styles/index.css';
import { Navbar } from './components/Navbar.js';
import './styles/index.css'
import "./i18n"; // import i18n

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>
);
