// store/useThemeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "dark",

      toggleTheme: () =>
        set({
          theme: get().theme === "light" ? "dark" : "light",
        }),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-store", // localStorage key
    }
  )
);
