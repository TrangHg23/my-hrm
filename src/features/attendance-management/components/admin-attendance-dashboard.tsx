"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AdminAttendanceTable } from "./admin-attendance-table";
import { getVNDateKey } from "@/utils/date";
import { useAttendanceManagement } from "../hooks/use-attendance-management";
import { mapAdminAttendanceList } from "../mapper/attendance-management";

export function AdminAttendanceDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>(
    getVNDateKey(new Date()),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: apiResponse, isLoading } = useAttendanceManagement({
    page: currentPage,
    limit: itemsPerPage,
    date: selectedDate,
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const currentData = useMemo(
    () => mapAdminAttendanceList(apiResponse?.data || []),
    [apiResponse],
  );

  const totalItems = apiResponse?.meta.total || 0;
  const totalPages = apiResponse?.meta.totalPages || 1;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 px-1">

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto mt-4 lg:mt-0 shrink-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm nhân viên..."
              className="w-full pl-8 bg-background"
            />
          </div>

          <div className="relative w-full sm:w-56">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground pointer-events-none uppercase">
              Ngày:
            </span>
            <Input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full pl-14 bg-background h-10 border-muted-foreground/20 focus:border-primary font-bold transition-all hover:border-primary/50"
            />
          </div>
        </div>
      </div>

      <AdminAttendanceTable
        data={currentData}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
