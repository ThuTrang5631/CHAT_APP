import { create } from "zustand";
import { request } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdateProfile: false,

  isCheckingAuth: true,
  saveAuthUser: (newUser: any) => set({ authUser: newUser }),
  checkAuth: async () => {
    try {
      const res = await request.get("/auth/check");
      console.log(res);

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
