import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { processLeaveRequestApi } from "../api/process-leave-request";
import { parseErrorMessage } from "@/utils/error";
import { leaveManagementKeys } from "../queryKeys/leave-management";

export const useRejectLeaveRequest = () => {
  return useMutation({
    mutationFn: ({ id, rejectReason }: { id: string; rejectReason: string }) => 
      processLeaveRequestApi({ id, status: "REJECTED", rejectReason }),
    onSuccess: () => {
      toast.success("Từ chối đơn xin nghỉ thành công!");
      queryClient.invalidateQueries({ queryKey: leaveManagementKeys.all });
    },
    onError: (error: unknown) => {
      toast.error("Từ chối đơn thất bại", {
        description: parseErrorMessage(error),
      });
    },
  });
};
