import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  fetchCurrentUser,
  getApiErrorMessage,
  getStoredToken,
  loginUser,
  logoutUser,
  registerUser,
  setStoredToken,
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      const token = getStoredToken();

      if (!token) {
        setAuthReady(true);
        return;
      }

      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setStoredToken("");
        setUser(null);
      } finally {
        setAuthReady(true);
      }
    };

    restoreSession();
  }, []);

  const handleAuthSuccess = (response) => {
    setStoredToken(response.token);
    setUser(response.user);
    return response.user;
  };

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      return { user: handleAuthSuccess(response), error: "" };
    } catch (error) {
      return { user: null, error: getApiErrorMessage(error) };
    }
  };

  const register = async (details) => {
    try {
      const response = await registerUser(details);
      return { user: handleAuthSuccess(response), error: "" };
    } catch (error) {
      return { user: null, error: getApiErrorMessage(error) };
    }
  };

  const logout = async () => {
    try {
      if (getStoredToken()) {
        await logoutUser();
      }
    } catch (error) {
      // Clear local session even if server logout fails.
    } finally {
      setStoredToken("");
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      authReady,
      isAuthenticated: Boolean(user),
      user,
      login,
      logout,
      register,
    }),
    [authReady, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
