import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Footer } from './components/Footer.js';
import Login from './components/Login.js';
import { Navbar } from './components/Navbar.js';
import './i18n';
// import i18n
import { Home } from './pages/home/Home.js';
import './styles/index.css';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen min-w-80">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
