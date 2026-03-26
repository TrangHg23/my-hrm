import { LeaveHistoryContainer } from "@/features/leave/components/leave-history-container";

export const metadata = {
  title: "Lịch sử xin nghỉ | My HRM",
  description: "Xem lại danh sách các yêu cầu xin nghỉ của bạn.",
};

export default function EmployeeLeaveHistoryPage() {
  return <LeaveHistoryContainer />;
}
