export type UserRole = 'user' | 'jury' | 'admin' | 'super-admin';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}
