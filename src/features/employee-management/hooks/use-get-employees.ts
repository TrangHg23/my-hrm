import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/features/employee-management/api/get-employees";

export const useGetEmployees = (page: number, limit: number = 10) => {
  return useQuery({
    queryKey: ["employees", page, limit],
    queryFn: () => getEmployees(page, limit),
    placeholderData: keepPreviousData,
  });
};
