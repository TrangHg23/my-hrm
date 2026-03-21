import { format } from "date-fns";
import { vi } from "date-fns/locale";

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
