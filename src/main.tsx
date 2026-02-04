import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import './styles/index.css';
import { Navbar } from './components/Navbar.js';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
    <BrowserRouter>
    <div className="min-h-screen bg-background text-foreground">
    <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </main>
      </div>
    </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
