import { format } from "date-fns";

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
