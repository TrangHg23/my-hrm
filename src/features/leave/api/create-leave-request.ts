import { api } from "@/lib/axios";
import { LeaveRequestFormValues } from "../schemas/leave-request-schema";

export const createLeaveRequestApi = async (data: LeaveRequestFormValues) => {
  const res = await api.post("/leave", data);
  return res.data;
};
