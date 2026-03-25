import { LeaveManagementContainer } from "@/features/leave-management/components/leave-management-container";

export const metadata = {
  title: "Quản lý xin nghỉ | Admin My HRM",
  description: "Duyệt hoặc từ chối các yêu cầu xin nghỉ từ nhân viên.",
};

export default function AdminLeaveRequestsPage() {
  return <LeaveManagementContainer />;
}
