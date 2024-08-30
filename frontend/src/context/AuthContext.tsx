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
      `${APP_CONSTANTS.API_PROD_URL}/auth/login`,
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  const updateProfile = async (profileData: any) => {
    try {
      // Update profile
      const res = await axios.put(
        `${APP_CONSTANTS.API_PROD_URL}/auth/editProfile`,
        profileData,
        {
          withCredentials: true,
        }
      );

      // Update state and localStorage with the updated user data
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const logout = async () => {
    await axios.post(
      `${APP_CONSTANTS.API_PROD_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

