import { Clock, History } from "lucide-react";

export const employeeNavItems = [
  {
    title: "Chấm công",
    url: "/employee/attendance",
    icon: Clock,
    id: "attendance",
  },
  {
    title: "Lịch sử xin nghỉ",
    url: "/employee/leave-history",
    icon: History,
    id: "leave-history",
  },
];
