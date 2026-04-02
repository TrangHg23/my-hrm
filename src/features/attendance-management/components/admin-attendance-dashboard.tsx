"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { AdminAttendanceTable } from "./admin-attendance-table";
import { getVNDateKey } from "@/utils/date";
import { useAttendanceManagement } from "../hooks/use-attendance-management";
import { mapAdminAttendanceList } from "../mapper/attendance-management";

export function AdminAttendanceDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>(
    getVNDateKey(new Date()),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const itemsPerPage = 10;

  const { data: apiResponse, isLoading } = useAttendanceManagement({
    page: currentPage,
    limit: itemsPerPage,
    date: selectedDate,
    q: debouncedSearchQuery,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

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
    <div className="space-y-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center gap-2 px-1">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhân viên..."
            className="w-full pl-8 bg-background h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative w-full md:w-56 shrink-0">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground pointer-events-none uppercase">
            Ngày:
          </span>
          <Input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full pl-14 bg-background h-10 border-muted-foreground/20 focus:border-primary transition-all hover:border-primary/50"
          />
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
