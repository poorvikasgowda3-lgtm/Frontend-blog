"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "./types";
import { getStoredUser, setStoredUser } from "./auth";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== "/login") {
        router.replace("/login");
      } else if (user && pathname === "/login") {
        router.replace("/feed");
      }
    }
  }, [user, loading, pathname, router]);

  const login = (newUser: User) => {
    setUser(newUser);
    setStoredUser(newUser);
    router.replace("/feed");
  };

  const logout = () => {
    setUser(null);
    setStoredUser(null);
    router.replace("/login");
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
