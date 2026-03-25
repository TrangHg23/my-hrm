import { api } from "@/lib/axios";
import { LeaveHistoryResponse } from "../types/leave";

export const getMyLeaveRequestsApi = async (
  page: number = 1,
  limit: number = 10,
): Promise<LeaveHistoryResponse> => {
  const res = await api.get("/leave/me", {
    params: { page, limit },
  });
  return res.data;
};
