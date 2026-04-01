import { PaginatedQueryParams } from "@/types/query-params";

export type AdminWorkSession = {
  in: string;
  out: string | null;
};

export type AdminAttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  employeeCode: string;
  sessions: AdminWorkSession[];
  totalHours: string;
  status: "present" | "absent" | "leave";
};

export interface AttendanceQueryParams extends PaginatedQueryParams {
  userId?: string;
  date?: string; // YYYY-MM-DD
}

export type AdminAttendanceApiResponse = {
  data: any[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
