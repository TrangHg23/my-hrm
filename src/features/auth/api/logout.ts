import { api } from "@/lib/axios";

export const logoutApi = async (token: string) => {
  const res = await api.post("/auth/logout", { token });

  return res.data;
};
