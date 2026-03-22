export interface WorkSession {
  in: string;
  out: string | null;
}

export interface AttendanceRecord {
  date: string;
  sessions: WorkSession[];
  workHours: string;
  status: string;
  note: string;
  type: "success" | "warning" | "danger" | "secondary";
}
