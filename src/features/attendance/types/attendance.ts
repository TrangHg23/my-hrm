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

export type CheckInCheckOutApiResponse = {
  action: "checkin" | "checkout";
  message: string;
  session: {
    id: string;
    attendanceId: string;
    checkinTime: string;
    checkoutTime: string | null;
    createdAt: string;
  };
};

export type Attendance = {
  isCheckIn: boolean;
  checkinTime: Date | null;
  checkoutTime: Date | null;
  message: string;
};

export const mapAttendance = (data: CheckInCheckOutApiResponse): Attendance => {
  const isCheckIn = data.action === "checkin";

  return {
    isCheckIn,
    checkinTime: isCheckIn ? new Date(data.session.checkinTime) : null,
    checkoutTime: data.session.checkoutTime
      ? new Date(data.session.checkoutTime)
      : null,
    message: data.message,
  };
};
