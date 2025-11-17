import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { VendorUser } from '../types';
import { getApiUrl } from '../config/api';

interface AuthContextType {
  user: VendorUser | null;
  loading: boolean;
  login: (username: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<VendorUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isFirstMount = useRef(true);

  // Restaurar sesión al cargar la aplicación
  useEffect(() => {
    const restaurarSesion = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      // Validar formato de datos antiguos y limpiar si es necesario
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (!parsedUser.role || (parsedUser.username === 'admin' && parsedUser.role !== 'admin')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setLoading(false);
            return;
          }
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setLoading(false);
          return;
        }
      }
      
      if (token && savedUser) {
        try {
          // Validar token con el backend
          const response = await fetch(getApiUrl('/api/auth/me'), {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              const parsedUser = JSON.parse(savedUser);
              setUser(parsedUser);
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setUser(null);
            }
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (error) {
          console.error('Error al restaurar sesión:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      
      setLoading(false);
    };

    // Solo ejecutar en el primer montaje
    if (isFirstMount.current) {
      isFirstMount.current = false;
      restaurarSesion();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string, remember: boolean = true): Promise<boolean> => {
    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        // Determinar el rol del usuario
        let roleValue: 'admin' | 'vendor' = 'vendor';
        if (Array.isArray(data.usuario.roles) && data.usuario.roles.length > 0) {
          const firstRole = data.usuario.roles[0];
          if (firstRole === 'admin') {
            roleValue = 'admin';
          }
        }
        
        const userData: VendorUser = {
          username: data.usuario.username,
          role: roleValue,
        };
        
        setUser(userData);
        
        // Guardar sesión en localStorage para persistencia
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return true;
      }
      
      console.log('❌ AuthContext: Login falló - no success o no token');
      return false;
    } catch (error) {
      console.error('💥 AuthContext: Error al iniciar sesión:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
