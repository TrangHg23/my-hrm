"use client";

import { useState } from "react";
import { LeaveHistoryTable } from "./leave-history-table";
import { useGetMyLeaveRequests } from "../hooks/use-get-my-leave-requests";

export function LeaveHistoryContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { data, isLoading } = useGetMyLeaveRequests(currentPage, itemsPerPage);
  const { leaveRequests = [], totalPages = 1, totalItems = 0 } = data || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">

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
