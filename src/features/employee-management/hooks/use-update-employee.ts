import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateEmployee } from "../api/update-employee";
import { CreateEmployeeFormValues, UpdateEmployeeFormValues } from "../types/employees";
import { queryClient } from "@/lib/query-client";
import { parseErrorMessage } from "@/utils/error";

export const useUpdateEmployee = (onSuccessCallback?: () => void) => {

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdateEmployeeFormValues> }) => updateEmployee(id, data),
    onSuccess: () => {
      toast.success("Cập nhật thông tin nhân viên thành công!");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee"] });
      onSuccessCallback?.();
    },
    onError: (error: any) => {
      toast.error(parseErrorMessage(error));
    },
  });
};
