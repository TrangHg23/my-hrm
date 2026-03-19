import { Users, Clock, CalendarOff } from "lucide-react";

export const adminNavItems = [
  {
    title: "Quản lý nhân viên",
    url: "/admin/employees",
    icon: Users,
    id: "employees",
  },
  {
    title: "Quản lý chấm công",
    url: "/admin/attendance",
    icon: Clock,
    id: "attendance",
  },
  {
    title: "Quản lý xin nghỉ",
    url: "/admin/leave-requests",
    icon: CalendarOff,
    id: "leave",
  },
];
