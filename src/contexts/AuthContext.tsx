import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ds_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const login = useCallback((newUser: User) => {
    setUser(newUser);
    try { localStorage.setItem('ds_user', JSON.stringify(newUser)); } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try { localStorage.removeItem('ds_user'); } catch {}
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      try { localStorage.setItem('ds_user', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
