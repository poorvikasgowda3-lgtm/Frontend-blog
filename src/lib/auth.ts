import type { User } from "./types";
import api from "./api";

const USER_STORAGE_KEY = "meet5_logged_in_user";
const TOKEN_STORAGE_KEY = "token";

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}

export async function authenticateUser(email: string, password: string): Promise<User> {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const response = await api.post('/auth/login', {
      email: normalizedEmail,
      password,
    });
    
    const { user, token } = response.data;
    
    // Save JWT token in localStorage
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    
    return user as User;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Invalid email or password");
  }
}

export async function registerUser(name: string, email: string, password: string): Promise<User> {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const response = await api.post('/auth/register', {
      name,
      email: normalizedEmail,
      password,
    });
    
    const { user, token } = response.data;
    
    // Save JWT token in localStorage
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    
    return user as User;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Registration failed");
  }
}
