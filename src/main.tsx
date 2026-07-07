import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import Login from './components/Login';
import { Navbar } from './components/Navbar';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './i18n';
import { Home } from './pages/home/Home';
import JuryDashboard from './pages/jury/JuryDashboard';
import { FilmUpload } from './pages/submission/FilmUpload';
import { Success } from './pages/submission/Success';
import AdminDashboard from './pages/admin/AdminDashboard';
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen min-w-80">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<FilmUpload />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/jury"
              element={
                <ProtectedRoute roles={['jury', 'admin', 'super-admin']}>
                  <JuryDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin', 'super-admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute roles={['super-admin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
