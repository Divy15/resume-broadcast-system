import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {ApiRoutes} from "../api/apiRoutes";
import app from "../api/axiosInstance";

// 1. Define the shape of our User and Context
interface User {
  id: string;
  name: string;
  email: string;
}

interface RedirectionInfo {
    is_app_pass_set: boolean;
    is_template_set: boolean;
    redirect_url: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  redirection: RedirectionInfo | null;
  refreshRedirection: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. The Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('pitchHRtoken'));
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [redirection, setRedirection] = useState<RedirectionInfo | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
        setUser(JSON.parse(savedUser));
        checkUserRedirection();
    } else {
        setIsAuthLoading(false);
    }
  }, [token]);

  const checkUserRedirection = async () => {
        try {
            const response = await app.get(ApiRoutes.auth.authRedirection);

            if (!response.data.success) {
                // Token invalid or expired - logout
                logout();
                return;
            }

            const data = await response.data.data[0];
            console.log("Auth redirect result", data)
            const { is_app_pass_set, is_template_set } = data;

            // Determine redirect url based on flags
            let redirect_url = '/hr/manager'; // default
            if (!is_app_pass_set) {
                redirect_url = '/email/config';
            } else if (!is_template_set) {
                redirect_url = '/templates/new';
            } else{
              redirect_url = '/dashboard'
            }

            setRedirection({ is_app_pass_set, is_template_set, redirect_url });
        } catch (err) {
            console.error('Redirection check failed:', err);
            logout();
        } finally {
            setIsAuthLoading(false);
        }
    };

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('pitchHRtoken', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('pitchHRtoken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, isAuthLoading, redirection, refreshRedirection: checkUserRedirection }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};