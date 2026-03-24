import { AttendanceRecord } from "../types/attendance";

export const getDayOfWeek = (dateStr: string) => {
  const [day, month] = dateStr.split("/").map(Number);
  const year = new Date().getFullYear();
  const date = new Date(
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00Z`,
  );
  const days = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  return {
    name: days[date.getUTCDay()],
    isSunday: date.getUTCDay() === 0,
  };
};

export const formatWorkHours = (hoursStr: string) => {
  if (!hoursStr || hoursStr.includes("0h")) return "00 giờ 00 phút";
  const match = hoursStr.match(/(\d+)h(?:(\d+)p[h]?)?/);
  if (match) {
    const h = match[1].padStart(2, "0");
    const p = (match[2] || "00").padStart(2, "0");
    return `${h} giờ ${p} phút`;
  }
  return hoursStr;
};

const getMondayStart = (dateStr: string) => {
  const [day, month] = dateStr.split("/").map(Number);
  const year = new Date().getFullYear();
  const d = new Date(
    `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00Z`,
  );
  const dayOfWeek = d.getUTCDay();
  const diff = d.getUTCDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(d.setUTCDate(diff));
  monday.setUTCHours(0, 0, 0, 0);
  return monday.getTime();
};

export const groupDataByWeek = (data: AttendanceRecord[]) => {
  const sortedData = [...data].sort((a, b) => {
    const dayA = parseInt(a.date.split("/")[0], 10);
    const dayB = parseInt(b.date.split("/")[0], 10);
    return dayB - dayA;
  });

  const weeksMap = new Map<number, AttendanceRecord[]>();
  sortedData.forEach((row) => {
    const weekKey = getMondayStart(row.date);
    if (!weeksMap.has(weekKey)) {
      weeksMap.set(weekKey, []);
    }
    weeksMap.get(weekKey)!.push(row);
  });

  return Array.from(weeksMap.values());
};

export const getAvailableMonths = (
  currentYear: number,
  currentMonth: number,
) => {
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(currentYear, currentMonth - 1 - i, 1);
    return { month: d.getMonth() + 1, year: d.getFullYear() };
  });
};
