import { Metadata } from "next";
import { EmployeeManagementDashboard } from "@/features/employee-management/components/employee-management-dashboard";

export const metadata: Metadata = {
  title: "Quản lý nhân viên | Admin",
  description: "Trang quản lý danh sách nhân viên trong hệ thống",
};

export default function EmployeeManagementPage() {
  return <EmployeeManagementDashboard />;
}
