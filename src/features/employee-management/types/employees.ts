import { createEmployeeSchema, updateEmployeeSchema } from "../schema/employee";
import z from "zod";

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

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeFormValues = z.infer<typeof updateEmployeeSchema>;
export type EmployeeFormValues = CreateEmployeeFormValues | UpdateEmployeeFormValues;
