import { api } from "@/lib/axios";

export interface Employee {
  id: string;
  email: string;
  role: string;
  name: string;
  phone: string | null;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetEmployeesResponse {
  data: Employee[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

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
