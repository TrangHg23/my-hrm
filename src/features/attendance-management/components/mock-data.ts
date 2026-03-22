import { AdminAttendanceRecord } from "../types/attendance-management";

export const generateMockAttendanceData = (date: Date): AdminAttendanceRecord[] => {
  const seed = date.getDate() + date.getMonth();
  const records: AdminAttendanceRecord[] = [];

  const names = [
    "Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Hoàng Văn E",
    "Đặng Thị F", "Vũ Văn G", "Bùi Thị H", "Đỗ Văn I", "Hồ Thị K",
    "Trương Văn L", "Ngô Thị M", "Lý Văn N", "Phan Thị P", "Vương Văn Q"
  ];

  const departments = ["Engineering", "HR", "Marketing", "Sales", "Design"];

  for (let i = 0; i < 35; i++) {
    const isAbsent = (i + seed) % 7 === 0;
    const isLeave = (i + seed) % 11 === 0;
    
    let status: "present" | "absent" | "leave" = "present";
    let sessions: { in: string; out: string | null }[] = [];
    let totalHours = "0h";

    if (isAbsent) {
      status = "absent";
    } else if (isLeave) {
      status = "leave";
    } else {
      status = "present";
      
      const hasMultipleSessions = (i + seed) % 3 === 0;

      if (hasMultipleSessions) {
        // Morning session
        const in1 = `08:${((i * 13 + seed) % 60).toString().padStart(2, "0")}`;
        const out1 = `12:${((i * 7 + seed) % 30).toString().padStart(2, "0")}`;
        // Afternoon session
        const in2 = `13:${((i * 11 + seed) % 30).toString().padStart(2, "0")}`;
        const out2 = `${17 + (i % 2)}:${((i * 19 + seed) % 60).toString().padStart(2, "0")}`;
        
        sessions.push({ in: in1, out: out1 }, { in: in2, out: out2 });
        totalHours = `${(4 + (parseInt(out2.split(":")[0]) - 13)).toFixed(1)}h`;
      } else {
        // Single session
        const inHour = 8;
        const inMinute = ((i * 13 + seed) % 90).toString().padStart(2, "0");
        const inTime = `0${inHour}:${inMinute}`;

        const outHour = 17 + ((i + seed) % 3);
        const outMinute = ((i * 17 + seed) % 60).toString().padStart(2, "0");
        const outTime = `${outHour}:${outMinute}`;
        
        sessions.push({ in: inTime, out: outTime });
        const totalH = (outHour - inHour) + (parseInt(outMinute) - parseInt(inMinute)) / 60;
        totalHours = `${totalH.toFixed(1)}h`;
      }
    }

    records.push({
      id: `ATT-${date.getTime()}-${i}`,
      employeeId: `EMP${(i + 1).toString().padStart(3, "0")}`,
      employeeName: names[i % names.length],
      employeeEmail: `employee${i + 1}@company.com`,
      sessions,
      totalHours,
      status,
    });
  }

  return records;
};
