import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllAttendanceApi } from "../api/attendance-management";
import { AttendanceQueryParams } from "../types/attendance-management";

export const useAttendanceManagement = (params: AttendanceQueryParams) => {
  return useQuery({
    queryKey: ["attendance-management", params],
    queryFn: () => getAllAttendanceApi(params),
    placeholderData: keepPreviousData,
  });
};
