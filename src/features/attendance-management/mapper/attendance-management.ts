import { formatTimeVN } from "@/utils/date";
import { AdminAttendanceRecord } from "../types/attendance-management";

export const mapAdminAttendanceList = (
  data: any[],
): AdminAttendanceRecord[] => {
  if (!data) return [];

  return data.map((record) => {
    const sessions = (record.sessions || []).map((s: any) => ({
      in: formatTimeVN(s.checkinTime),
      out: s.checkoutTime ? formatTimeVN(s.checkoutTime) : null,
    }));

    const hours = Math.floor(record.totalHours || 0);
    const minutes = Math.round(((record.totalHours || 0) % 1) * 60);
    const totalHoursStr =
      hours > 0 || minutes > 0
        ? `${hours}h ${minutes > 0 ? minutes + "p" : ""}`
        : "0h";

    return {
      id: record.id,
      employeeId: record.user?.id || record.userId,
      employeeName: record.user?.name || "N/A",
      employeeEmail: record.user?.email || "N/A",
      employeeCode: record.user?.empCode || "N/A",
      sessions,
      totalHours: totalHoursStr,
      status: record.status.toLowerCase() as "present" | "absent" | "leave",
    };
  });
};
