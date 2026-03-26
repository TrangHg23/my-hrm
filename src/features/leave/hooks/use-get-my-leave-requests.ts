import { useQuery } from "@tanstack/react-query";
import { getMyLeaveRequestsApi } from "../api/get-my-leave-requests";
import { LeaveHistoryResponse, LeaveRequest } from "../types/leave";
import { leaveKeys } from "../queryKeys/leave";

export const useGetMyLeaveRequests = (page: number = 1, limit: number = 10) => {
  return useQuery<
    LeaveHistoryResponse,
    Error,
    {
      leaveRequests: LeaveRequest[];
      totalPages: number;
      totalItems: number;
    }
  >({
    queryKey: leaveKeys.mePaginated(page, limit),
    queryFn: () => getMyLeaveRequestsApi(page, limit),
    select: (data) => ({
      leaveRequests: data.data || [],
      totalPages: data.meta?.totalPages || 1,
      totalItems: data.meta?.total || 0,
    }),
  });
};
