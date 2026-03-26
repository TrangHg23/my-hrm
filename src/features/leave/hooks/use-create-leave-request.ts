import { useMutation } from "@tanstack/react-query";
import { createLeaveRequestApi } from "../api/create-leave-request";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";
import { leaveKeys } from "../queryKeys/leave";
import { parseErrorMessage } from "@/utils/error";

export const useCreateLeaveRequest = () => {
  return useMutation({
    mutationFn: createLeaveRequestApi,
    onSuccess: () => {
      toast.success("Tạo đơn xin nghỉ thành công!", {
        description: "Đơn của bạn đã được gửi và đang chờ duyệt.",
      });
      queryClient.invalidateQueries({ queryKey: leaveKeys.me() });
    },
    onError: (error: unknown) => {
      toast.error("Tạo đơn thất bại", {
        description: parseErrorMessage(error, {
          overlaps:
            "Khoảng thời gian này trùng với một đơn nghỉ bạn đã tạo. Vui lòng kiểm tra lại.",
        }),
      });
    },
  });
};
