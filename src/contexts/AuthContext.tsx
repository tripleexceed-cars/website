import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'manager' | 'sales' | 'staff' | 'client';

export interface User {
  id?: string;
  email: string;
  role: UserRole;
  name?: string;
  isFirstLogin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userOrEmail: User | string, roleParam?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('te_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userOrEmail: User | string, roleParam?: UserRole) => {
    let newUser: User;
    if (typeof userOrEmail === 'string') {
      newUser = { 
        email: userOrEmail, 
        role: roleParam || 'client', 
        name: userOrEmail.split('@')[0] 
      };
    } else {
      newUser = userOrEmail;
    }
    setUser(newUser);
    localStorage.setItem('te_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('te_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
