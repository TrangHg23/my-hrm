import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateEmployee } from "../api/update-employee";
import { queryClient } from "@/lib/query-client";
import { parseErrorMessage } from "@/utils/error";
import { ToggleActiveParams } from "../types/employees";

export const useToggleEmployeeActive = () => {
  return useMutation({
    mutationFn: ({ id, isActive }: ToggleActiveParams) =>
      updateEmployee(id, { isActive }),
    onSuccess: (data) => {
      const statusMessage = data.isActive ? "kích hoạt" : "vô hiệu hóa";
      toast.success(`Đã ${statusMessage} tài khoản nhân viên thành công!`);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: any) => {
      toast.error(parseErrorMessage(error));
    },
  });
};
