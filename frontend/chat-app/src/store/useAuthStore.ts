import { create } from "zustand";
import { request } from "../lib/axios";

export interface AuthUser {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdateProfile: boolean;
  isCheckingAuth: boolean;
  saveAuthUser: (newUser: AuthUser) => void;
  checkAuth: () => Promise<void>;
  onlineUsers: string[];
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdateProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  saveAuthUser: (newUser: AuthUser | null) => set({ authUser: newUser }),
  checkAuth: async () => {
    try {
      const res = await request.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
