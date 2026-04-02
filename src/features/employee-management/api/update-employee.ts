import { api } from "@/lib/axios";
import { Employee, UpdateEmployeeFormValues } from "../types/employees";

export const updateEmployee = async (id: string, data: Partial<UpdateEmployeeFormValues>): Promise<Employee> => {
  const response = await api.patch(`/users/employees/${id}`, data);
  return response.data;
};
