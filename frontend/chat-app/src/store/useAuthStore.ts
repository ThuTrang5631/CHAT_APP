import { create } from "zustand";
import { request } from "../lib/axios";
import { BASE_URL } from "../utils/constants";
import { io } from "socket.io-client";

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
  saveAuthUser: (newUser: AuthUser | null) => void;
  checkAuth: () => Promise<void>;
  onlineUsers: string[];
  socket: any;
  connectSocket: any;
  disconnectSocket: any;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdateProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  saveAuthUser: (newUser: AuthUser | null) => set({ authUser: newUser }),
  checkAuth: async () => {
    try {
      const res = await request.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    // listen event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
