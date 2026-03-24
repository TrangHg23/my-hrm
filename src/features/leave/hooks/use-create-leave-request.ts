import { useMutation } from "@tanstack/react-query";
import { createLeaveRequestApi } from "../api/create-leave-request";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";

export const useCreateLeaveRequest = () => {
  return useMutation({
    mutationFn: createLeaveRequestApi,
    onSuccess: () => {
      toast.success("Tạo đơn xin nghỉ thành công!", {
        description: "Đơn của bạn đã được gửi và đang chờ duyệt.",
      });
      queryClient.invalidateQueries({ queryKey: ["leave-history"] });
    },
    onError: (error: any) => {
      toast.error("Tạo đơn thất bại", {
        description:
          error?.response?.data?.message || "Có lỗi xảy ra khi gửi đơn xin nghỉ.",
      });
    },
  });
};
