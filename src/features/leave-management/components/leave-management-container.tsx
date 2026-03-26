"use client";

import { useState } from "react";
import { useAuthStore } from "@/features/auth/stores/auth";
import { GreetingHeader } from "@/components/ui/greeting-header";
import { LeaveManagementTable } from "./leave-management-table";
import { useGetAdminLeaveRequests } from "../hooks/use-get-leave-requests";

export function LeaveManagementContainer() {
  const user = useAuthStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading } = useGetAdminLeaveRequests(currentPage, itemsPerPage);
  const { data: leaveRequests = [], meta } = data || {};
  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.total || 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <GreetingHeader
          name={user?.name}
          fallbackName="Admin"
          subtitle="Duyệt hoặc từ chối các yêu cầu xin nghỉ từ nhân viên."
        />
      </div>

      <div className="space-y-4">
        <LeaveManagementTable 
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
