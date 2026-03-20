import { useQuery } from "@tanstack/react-query";
import { getDetailEmployee } from "../api/get-detail-employee";

export const useDetailEmployee = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getDetailEmployee(id),
    enabled: !!id && enabled,
  });
};
