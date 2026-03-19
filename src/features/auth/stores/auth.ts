import { AuthUser } from "@/features/auth/types/auth";
import { create } from "zustand";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;

  login: (user: AuthUser, token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, accessToken: token });
  },
}));
