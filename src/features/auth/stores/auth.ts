import { AuthUser } from "@/features/auth/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;

  login: (user: AuthUser, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      login: (user, token) => {
        set({
          user,
          accessToken: token,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
