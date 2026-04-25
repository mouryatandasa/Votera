import React, { createContext, useContext, useState, useEffect } from 'react';
import { endpoints } from './api';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('votera_token');
    if (token) {
      endpoints.auth.me(token)
        .then(u => setUser(u))
        .catch(() => localStorage.removeItem('votera_token'))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (data: any) => {
    const res = await endpoints.auth.login(data);
    localStorage.setItem('votera_token', res.access_token);
    setUser(res.user);
  };

  const register = async (data: any) => {
    await endpoints.auth.register(data);
  };

  const logout = () => {
    localStorage.removeItem('votera_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
