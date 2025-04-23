import { create } from "zustand";
import { request } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdateProfile: false,

  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await request.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
    } finally {
      set({ authUser: null });
    }
  },
}));
