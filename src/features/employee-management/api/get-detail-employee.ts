import { api } from "@/lib/axios";
import { Employee } from "../types/employees";

export const getDetailEmployee = async (id: string): Promise<Employee> => {
  const response = await api.get(`/users/employees/${id}`);
  return response.data;
};
