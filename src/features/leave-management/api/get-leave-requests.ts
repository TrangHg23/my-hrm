import { api } from "@/lib/axios";

export const getAdminLeaveRequestsApi = async (
  page: number = 1,
  limit: number = 10,
) => {
  const res = await api.get("/leave", {
    params: { page, limit },
  });
  return res.data;
};
