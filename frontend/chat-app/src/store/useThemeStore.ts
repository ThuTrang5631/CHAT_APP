import { create } from "zustand";

interface ThemeStore {
  theme: string;
  saveTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem("theme") || "light",
  saveTheme: (theme: string) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
