export type AdminWorkSession = {
  in: string;
  out: string | null;
};

export type AdminAttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  sessions: AdminWorkSession[];
  totalHours: string;
  status: "present" | "absent" | "leave";
};

export type AttendanceQueryParams = {
  page?: number;
  limit?: number;
  userId?: string;
  date?: string; // YYYY-MM-DD
};

export type AdminAttendanceApiResponse = {
  data: any[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
