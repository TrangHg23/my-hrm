import { useMutation } from "@tanstack/react-query";
import { checkInCheckOutApi } from "../api/attendance";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";
import { Attendance } from "@/features/attendance/types/attendance";

export const useCheckInCheckOut = () => {
  return useMutation<Attendance, Error, void>({
    mutationFn: () => checkInCheckOutApi(),
    onSuccess: (data: any) => {
      const isCheckIn = data.action === "checkin";
      toast.success(
        isCheckIn ? "Check-in thành công!" : "Check-out thành công!",
        {
          description:
            data.message ||
            (isCheckIn ? "Bắt đầu ca làm việc." : "Kết thúc ca làm việc."),
        },
      );
      queryClient.invalidateQueries({ queryKey: ["my-attendance"] });
    },
    onError: (error: any) => {
      toast.error("Thất bại", {
        description:
          error?.response?.data?.message || "Có lỗi xảy ra khi chấm công.",
      });
    },
  });
};