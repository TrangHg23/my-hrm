import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "../api/create-employee";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";
import { parseErrorMessage } from "@/utils/error";

export const useCreateEmployee = (onSuccess?: () => void) => {

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Tạo tài khoản nhân viên thành công");
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(parseErrorMessage(error));
    },
  });
};
