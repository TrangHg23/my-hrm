import { api } from "@/lib/axios";
import {
  AttendanceQueryParams,
  AdminAttendanceApiResponse,
} from "../types/attendance-management";

export const getAllAttendanceApi = async (
  params: AttendanceQueryParams,
): Promise<AdminAttendanceApiResponse> => {
  const response = await api.get("/attendance", { params });
  return response.data;
};
