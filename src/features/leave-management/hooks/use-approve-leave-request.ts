import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { processLeaveRequestApi } from "../api/process-leave-request";
import { parseErrorMessage } from "@/utils/error";
import { leaveManagementKeys } from "../queryKeys/leave-management";

export const useApproveLeaveRequest = () => {
  return useMutation({
    mutationFn: (id: string) => 
      processLeaveRequestApi({ id, status: "APPROVED" }),
    onSuccess: () => {
      toast.success("Phê duyệt đơn xin nghỉ thành công!");
      queryClient.invalidateQueries({ queryKey: leaveManagementKeys.all });
    },
    onError: (error: unknown) => {
      toast.error("Phê duyệt đơn thất bại", {
        description: parseErrorMessage(error),
      });
    },
  });
};