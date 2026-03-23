import { api } from "@/lib/axios";

export const getMyAttendanceApi = async (query: { month?: number; year?: number }) => {
  const res = await api.get("/attendance/me", { params: query });
  return res.data;
};