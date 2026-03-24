import { AttendanceRecord } from "@/features/attendance/types/attendance";
import { formatTimeVN, getVNDateKey } from "@/utils/date";

export const mapAttendanceList = (data: any[]): AttendanceRecord[] => {
  if (!data) return [];

  return data.map((record) => {
    const dateKey = getVNDateKey(record.date);
    const [year, month, day] = dateKey.split("-");

    const sessions = (record.sessions || []).map((s: any) => {
      const inTime = formatTimeVN(s.checkinTime);

      let outTime = null;
      if (s.checkoutTime) {
        outTime = formatTimeVN(s.checkoutTime);
      }

      return { in: inTime, out: outTime };
    });

    const hours = Math.floor(record.totalHours || 0);
    const minutes = Math.round(((record.totalHours || 0) % 1) * 60);

    return {
      date: `${day}/${month}`,
      sessions,
      workHours:
        hours > 0 || minutes > 0
          ? `${hours}h${minutes > 0 ? minutes + "p" : ""}`
          : "0h",
      status: record.status === "PRESENT" ? "Đã chấm công" : "Chưa chấm công",
      type: record.status === "PRESENT" ? "success" : "warning",
      note: record.note || "",
    };
  });
};
