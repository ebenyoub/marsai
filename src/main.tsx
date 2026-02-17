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
import SubmissionForm from './pages/submission/SubmissionForm.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<SubmissionForm/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
