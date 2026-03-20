import { api } from "@/lib/axios";
import { Employee, CreateEmployeeFormValues } from "../types/employees";

export const createEmployee = async (data: CreateEmployeeFormValues): Promise<Employee> => {
  const response = await api.post("/users/employees", data);
  return response.data;
};
