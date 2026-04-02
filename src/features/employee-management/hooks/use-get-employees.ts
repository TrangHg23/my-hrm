import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/features/employee-management/api/get-employees";
import { EmployeeQueryParams } from "../types/employees";

export const useGetEmployees = (params: EmployeeQueryParams) => {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: () => getEmployees(params),
    placeholderData: keepPreviousData,
  });
};
