import { createEmployeeSchema, updateEmployeeSchema } from "../schema/employee";
import z from "zod";
import { PaginatedQueryParams } from "@/types/query-params";

export enum EmployeeStatus {
  WORKING = "WORKING",
  PROBATION = "PROBATION",
  RESIGNED = "RESIGNED",
}

export interface Employee {
  id: string;
  empCode: string;
  status: EmployeeStatus;
  email: string;
  role: string;
  name: string;
  phone: string | null;
  creatorId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ToggleActiveParams {
  id: string;
  isActive: boolean;
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

export interface EmployeeQueryParams extends PaginatedQueryParams {}

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeFormValues = z.infer<typeof updateEmployeeSchema>;
export type EmployeeFormValues = CreateEmployeeFormValues | UpdateEmployeeFormValues;
