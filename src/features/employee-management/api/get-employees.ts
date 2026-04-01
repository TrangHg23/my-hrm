import { GetEmployeesResponse, EmployeeQueryParams } from "@/features/employee-management/types/employees";
import { api } from "@/lib/axios";

export const getEmployees = async (
  params: EmployeeQueryParams,
): Promise<GetEmployeesResponse> => {
  const { q, ...rest } = params;
  const response = await api.get("/users/employees", {
    params: {
      ...rest,
      ...(q ? { q } : {}),
    },
  });
  return response.data;
};
