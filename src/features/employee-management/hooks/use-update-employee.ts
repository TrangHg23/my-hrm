import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateEmployee } from "../api/update-employee";
import { CreateEmployeeFormValues } from "../types/employees";

export const useUpdateEmployee = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateEmployeeFormValues> }) => updateEmployee(id, data),
    onSuccess: () => {
      toast.success("Cập nhật thông tin nhân viên thành công!");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee"] });
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Đã có lỗi xảy ra khi cập nhật nhân viên";
      toast.error(errorMessage);
    },
  });
};
