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
