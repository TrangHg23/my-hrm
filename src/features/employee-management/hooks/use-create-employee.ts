import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../api/create-employee";
import { toast } from "sonner";

export const useCreateEmployee = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Tạo tài khoản nhân viên thành công");
      onSuccess?.();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra khi tạo nhân viên";
      toast.error(message);
    },
  });
};
