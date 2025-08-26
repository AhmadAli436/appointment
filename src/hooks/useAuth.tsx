
'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define the user type
interface User {
  uid: string;
  email: string;
  displayName: string;
}

// Mock users database
const mockUsers: { [key: string]: User } = {
  'user@example.com': { uid: 'mock-user-uid', email: 'user@example.com', displayName: 'Mock User' },
  'admin@example.com': { uid: 'mock-admin-uid', email: 'admin@example.com', displayName: 'Mock Admin' },
};

// Create Auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for a logged-in user in localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const foundUser = mockUsers[email];
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      router.push('/dashboard');
    } else {
      setLoading(false);
      throw new Error('User not found.');
    }
    setLoading(false);
  };
  
  const signup = async (email: string) => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    if (mockUsers[email]) {
        setLoading(false);
        throw new Error('User already exists.');
    }
    const newUser = { uid: `mock-${email}-uid`, email, displayName: 'New User' };
    mockUsers[email] = newUser;
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/dashboard');
    setLoading(false);
  }

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const value = { user, loading, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use Auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
