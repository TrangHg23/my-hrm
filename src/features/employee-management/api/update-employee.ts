import { api } from "@/lib/axios";
import { Employee, CreateEmployeeFormValues } from "../types/employees";

export const updateEmployee = async (id: string, data: Partial<CreateEmployeeFormValues>): Promise<Employee> => {
  const response = await api.patch(`/users/employees/${id}`, data);
  return response.data;
};
