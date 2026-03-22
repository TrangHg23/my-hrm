"use client";

import { useState, useMemo, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { GreetingHeader } from "@/components/ui/greeting-header";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/stores/auth";
import { AdminAttendanceTable } from "./admin-attendance-table";
import { generateMockAttendanceData } from "./mock-data";
import { formatDate } from "@/utils/date";

export function AdminAttendanceDashboard() {
  const user = useAuthStore((state) => state.user);
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date(), "yyyy-MM-dd"));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedDate, currentPage]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const allData = useMemo(() => {
    const d = new Date(selectedDate);
    if (isNaN(d.getTime())) return [];
    return generateMockAttendanceData(d);
  }, [selectedDate]);

  const totalItems = allData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return allData.slice(start, start + itemsPerPage);
  }, [allData, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <GreetingHeader
          name={user?.name}
          fallbackName="Admin"
          subtitle="Theo dõi và quản lý dữ liệu chấm công của toàn bộ nhân viên."
        />

        {/* Filters and Actions */}
        <div className="flex items-center w-full lg:w-auto mt-4 lg:mt-0 shrink-0">
          <div className="relative w-full sm:w-64">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full pl-10 bg-background h-10 border-muted-foreground/20 focus:border-primary font-medium"
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
