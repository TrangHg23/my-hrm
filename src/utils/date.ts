import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

export const formatDate = (
  date: string | Date | undefined | null,
  formatStr: string = "dd/MM/yyyy",
): string => {
  if (!date) return "---";

  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    console.error("Lỗi format ngày:", error);
    return "---";
  }
};

export const formatVietnameseDate = (date: Date): string => {
  const formattedDate = format(date, "EEEE, 'ngày' d/M/yy", { locale: vi });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export const formatToVN = (date: Date | string): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: VIETNAM_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hourCycle: "h23",
  }).format(d);
};

export const formatDateOnlyVN = (date: Date | string): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: VIETNAM_TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
};

export const getVNDateKey = (date: Date | string | number): string => {
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: VIETNAM_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
};

export const formatTimeVN = (date: Date | string | null | undefined): string => {
  if (!date) return "---";
  
  if (typeof date === 'string') {
    // If it's already a time string like "13:00" or "13:00:00", just return the HH:mm part
    const timeRegex = /^(\d{2}:\d{2})(:\d{2})?$/;
    const match = date.match(timeRegex);
    if (match) {
      return match[1];
    }
  }

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "---";
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: VIETNAM_TIMEZONE,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(d);
  } catch (error) {
    return "---";
  }
};
