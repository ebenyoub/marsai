import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api';
import { AuthContext } from '../hooks/useAuth';
import { User } from '../types/auth';

// AuthProvider.tsx
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate]);

  const login = useCallback(
    (newToken: string, userData: User) => {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      navigate('/', { replace: true });
    },
    [navigate]
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await apiRequest<{ user: User }>('/auth/profile', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setUser(result.user);
      } catch (error) {
        console.error('Auth initialization failed:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [logout]);

  const value = useMemo(
    () => ({
      isAuthenticated: !!user,
      isLoading,
      token,
      user,
      login,
      logout,
    }),
    [user, isLoading, login, token, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div className="flex h-screen items-center justify-center">Chargement...</div> : children}
    </AuthContext.Provider>
  );
};
