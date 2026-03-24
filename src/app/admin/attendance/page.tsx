import { AdminAttendanceDashboard } from "@/features/attendance-management/components/admin-attendance-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý chấm công | Admin",
  description: "Trang quản lý chấm công dành cho Admin",
};

export default function AdminAttendancePage() {
  return <AdminAttendanceDashboard />;
}
