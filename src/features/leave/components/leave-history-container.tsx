"use client";

import { useState } from "react";
import { useAuthStore } from "@/features/auth/stores/auth";
import { GreetingHeader } from "@/components/ui/greeting-header";
import { LeaveHistoryTable } from "./leave-history-table";
import { useGetMyLeaveRequests } from "../hooks/use-get-my-leave-requests";

export function LeaveHistoryContainer() {
  const user = useAuthStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { data, isLoading } = useGetMyLeaveRequests(currentPage, itemsPerPage);
  const { leaveRequests = [], totalPages = 1, totalItems = 0 } = data || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <GreetingHeader
          name={user?.name}
          fallbackName="Nhân viên"
          subtitle="Xem lại danh sách các yêu cầu xin nghỉ của bạn tại đây."
        />
      </div>

      <div className="space-y-4">
        <LeaveHistoryTable 
          data={leaveRequests} 
          isLoading={isLoading} 
          pagination={{
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            onPageChange: setCurrentPage,
          }}
        />
      </div>
    </div>
  );
}
