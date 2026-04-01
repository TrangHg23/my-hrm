import { api } from "@/lib/axios";
import {
  AttendanceQueryParams,
  AdminAttendanceApiResponse,
} from "../types/attendance-management";

export const getAllAttendanceApi = async (
  params: AttendanceQueryParams,
): Promise<AdminAttendanceApiResponse> => {
  const { q, ...rest } = params;
  const response = await api.get("/attendance", {
    params: {
      ...rest,
      ...(q ? { q } : {}),
    },
  });
  return response.data;
};
