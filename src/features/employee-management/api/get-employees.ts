import { GetEmployeesResponse } from "@/features/employee-management/types/employees";
import { api } from "@/lib/axios";

export const getEmployees = async (
  page: number,
  limit: number,
): Promise<GetEmployeesResponse> => {
  const response = await api.get("/users/employees", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};
