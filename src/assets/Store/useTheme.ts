// store/useThemeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
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
        hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

    }),
    {
      name: "theme-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      } // localStorage key
    }
  )
);
