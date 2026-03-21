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

export function generateAttendanceData(year: number, month: number): AttendanceRecord[] {
  const data: AttendanceRecord[] = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  const daysInMonth = new Date(year, month, 0).getDate();
  
  if (year > currentYear || (year === currentYear && month > currentMonth)) {
    return [];
  }

  let lastDay = daysInMonth;
  if (year === currentYear && month === currentMonth) {
    lastDay = currentDate;
  }

  for (let i = lastDay; i >= 1; i--) {
    const isToday = year === currentYear && month === currentMonth && i === currentDate;
    const dateObj = new Date(year, month - 1, i);
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Always render today's status even if it's a weekend
    if (isToday) {
      data.push({
        date: `${i}/${month}`,
        sessions: [{ in: "08:00", out: "12:00" }, { in: "13:30", out: null }],
        workHours: "4h",
        status: "Đang làm việc",
        note: "",
        type: "success"
      });
      continue;
    }

    if (isWeekend) continue;

    const random = Math.sin(year * 1000 + month * 100 + i) * 0.5 + 0.5;
    
    let sessions: WorkSession[] = [{ in: "08:00", out: "12:00" }, { in: "13:30", out: "17:30" }];
    let status = "Đi làm";
    let note = "";
    let type: "success" | "warning" | "danger" | "secondary" = "success";
    let workHours = "8h";

    if (random > 0.85) {
      sessions = [{ in: "08:35", out: "12:00" }, { in: "13:30", out: "17:30" }];
      status = "Đi làm";
      note = "Đi muộn";
      type = "success";
      workHours = "7h25p";
    } else if (random > 0.65) {
      sessions = [{ in: "08:00", out: "12:00" }, { in: "13:30", out: "15:00" }];
      status = "Đi làm";
      note = "Về sớm";
      type = "success";
      workHours = "5h30p";
    } else if (random < 0.1) {
      sessions = [];
      status = "Nghỉ phép";
      note = "Lý do cá nhân";
      type = "warning";
      workHours = "0h";
    } else if (random > 0.4 && random <= 0.5) {
      sessions = [];
      status = "Vắng mặt";
      note = "Không phép";
      type = "danger";
      workHours = "0h";
    }

    data.push({
      date: `${i}/${month}`,
      sessions,
      workHours,
      status,
      note,
      type
    });
  }

  return data;
}

export function getMonthSummary(data: AttendanceRecord[]) {
  let totalMinutes = 0;
  let presentDays = 0;
  let leaveDays = 0;
  let absentDays = 0;

  data.forEach(row => {
    if (row.status === "Đi làm" || row.status === "Đang làm việc") {
      presentDays++;
      const matchHours = row.workHours.match(/(\d+)h(?:(\d+)p)?/);
      if (matchHours) {
        totalMinutes += parseInt(matchHours[1] || "0") * 60 + parseInt(matchHours[2] || "0");
      }
    } else if (row.status === "Nghỉ phép") {
      leaveDays++;
    } else if (row.status === "Vắng mặt") {
      absentDays++;
    }
  });

  const hours = Math.floor(totalMinutes / 60);
  const totalDaysInMonth = 22;

  return {
    totalHours: `${hours} h`,
    presentDays: `${presentDays}/${totalDaysInMonth}`,
    leaveDays: leaveDays < 10 ? `0${leaveDays}` : `${leaveDays}`,
    absentDays: absentDays < 10 ? `0${absentDays}` : `${absentDays}`
  };
}
