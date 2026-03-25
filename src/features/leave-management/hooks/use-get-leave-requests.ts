import { useQuery } from "@tanstack/react-query";
import { getAdminLeaveRequestsApi } from "../api/get-leave-requests";
import { leaveManagementKeys } from "../queryKeys/leave-management";

export const useGetAdminLeaveRequests = (
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: leaveManagementKeys.listPaginated(page, limit),
    queryFn: () => getAdminLeaveRequestsApi(page, limit),
  });
};
