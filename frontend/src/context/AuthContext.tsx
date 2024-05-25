import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { APP_CONSTANTS } from "../constants/appConstants";
import axios from "axios";

export const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const storedUser = localStorage.getItem("user");
  const initialUser =
    typeof storedUser === "string" ? JSON.parse(storedUser) : null;
  const [currentUser, setCurrentUser] = useState<string | null>(initialUser);

  const login = async (inputs: any) => {
    const res = await axios.post(
      `${APP_CONSTANTS.API_BASE_URL}/auth/login`,
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const value = {
    currentUser,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

