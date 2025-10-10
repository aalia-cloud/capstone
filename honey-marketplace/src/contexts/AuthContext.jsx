import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// API base URL - adjust this to match your backend server
const API_BASE_URL = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for stored authentication on app load
    const initializeAuth = async () => {
      console.log('🔐 Initializing authentication...');
      try {
        const storedUser = localStorage.getItem('beesure_user');
        console.log('📦 Stored user data:', storedUser ? 'Found' : 'Not found');

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            // Validate that the stored user has required fields
            if (parsedUser && parsedUser.id && parsedUser.email) {
              console.log('✅ Valid stored user found:', parsedUser.email);
              setUser(parsedUser);
            } else {
              console.warn('⚠️ Invalid stored user data, clearing localStorage');
              localStorage.removeItem('beesure_user');
            }
          } catch (error) {
            console.error('❌ Error parsing stored user:', error);
            localStorage.removeItem('beesure_user');
          }
        }
      } catch (error) {
        console.error('❌ Error initializing authentication:', error);
        setError('Failed to initialize authentication');
      } finally {
        console.log('🏁 Authentication initialization complete');
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user data in state and localStorage
      setUser(data);
      localStorage.setItem('beesure_user', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        setError('Login request timed out. Please check your connection and try again.');
      } else if (error.message.includes('fetch')) {
        setError('Unable to connect to server. Please check if the backend is running.');
      } else {
        setError(error.message);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        setError('Registration request timed out. Please check your connection and try again.');
      } else if (error.message.includes('fetch')) {
        setError('Unable to connect to server. Please check if the backend is running.');
      } else {
        setError(error.message);
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('beesure_user');
  };

  const clearAuthData = () => {
    console.log('Clearing all authentication data...');
    setUser(null);
    setError(null);
    localStorage.removeItem('beesure_user');
    localStorage.removeItem('beesure_token'); // Clear any tokens if they exist
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('beesure_user', JSON.stringify(updatedUser));
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    updateUser,
    isAdmin,
    isAuthenticated,
    setError,
    clearAuthData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
