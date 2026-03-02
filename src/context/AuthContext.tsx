import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../hooks/useAuth';
import { User } from '../types/auth';

// AuthProvider.tsx
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // État critique
  const navigate = useNavigate();

  const login = useCallback(
    (newToken: string, userData: User) => {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);

      navigate('/profile', {
        replace: true,
      });
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error(error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
