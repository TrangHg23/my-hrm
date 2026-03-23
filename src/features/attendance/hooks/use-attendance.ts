import { getMyAttendanceApi } from "@/features/attendance/api/attendance";
import { useQuery } from "@tanstack/react-query";

export const useMyAttendance = (query: { month?: number; year?: number }) => {
  return useQuery({
    queryKey: ["my-attendance", query.month, query.year],
    queryFn: () => getMyAttendanceApi(query),
  });
};
