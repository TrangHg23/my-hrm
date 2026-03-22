"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Calendar,
  History,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";
import { format } from "date-fns";
import { useAuthStore } from "@/features/auth/stores/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatVietnameseDate } from "@/utils/date";
import { AttendanceTable } from "./attendance-table";
import { GreetingHeader } from "@/components/ui/greeting-header";
import { generateAttendanceData, getMonthSummary } from "./mock-data";
import { toast } from "sonner";
import { getAvailableMonths } from "../utils/attendance";

export function AttendanceDashboard() {
  const user = useAuthStore((state) => state.user);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Check-in state (Mock)
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentCheckInTime, setCurrentCheckInTime] = useState<Date | null>(null);

  const capitalizedDate = formatVietnameseDate(today);

  // Dynamic data and summary
  const attendanceData = useMemo(
    () => generateAttendanceData(selectedYear, selectedMonth),
    [selectedMonth, selectedYear]
  );
  
  const summary = useMemo(
    () => getMonthSummary(attendanceData),
    [attendanceData]
  );

  // Generate last 12 months for dropdown
  const availableMonths = useMemo(
    () => getAvailableMonths(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [m, y] = e.target.value.split("-");
    setSelectedMonth(parseInt(m, 10));
    setSelectedYear(parseInt(y, 10));
  };

  const handleCheckInOut = () => {
    const now = new Date();
    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setCurrentCheckInTime(now);
      toast.success("Check-in thành công!", {
        description: `Bắt đầu ca làm việc lúc ${format(now, "HH:mm")}`,
      });
    } else {
      if (currentCheckInTime) {
        const diffMinutes = (now.getTime() - currentCheckInTime.getTime()) / 60000;
        if (diffMinutes < 30) {
          toast.error("Không thể Check-out", {
            description: "Chưa đủ 30 phút kể từ lúc Check-in. Vui lòng tiếp tục làm việc.",
          });
          return;
        }
      }
      setIsCheckedIn(false);
      setCurrentCheckInTime(null);
      toast.success("Check-out thành công!", {
        description: `Kết thúc ca làm việc lúc ${format(now, "HH:mm")}`,
      });
    }
  };

  const selectValue = `${selectedMonth}-${selectedYear}`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      {/* Greeting & Action Card */}
      <div className="space-y-4">
        <GreetingHeader name={user?.name} fallbackName="Nguyễn Văn A" />

        <div className="bg-card rounded-xl border p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Calendar className="size-5 text-primary" />
              <span>{capitalizedDate}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sẵn sàng để bắt đầu một ngày làm việc hiệu quả!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleCheckInOut}
              className={cn(
                "h-11 px-8 group relative overflow-hidden text-primary-foreground rounded-lg transition-all hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 w-full sm:w-auto",
                isCheckedIn
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              <span className="relative z-10 font-bold uppercase tracking-wide">
                {isCheckedIn ? "Check-Out Ngay" : "Check-In Ngay"}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <Button
              variant="outline"
              className="h-11 px-6 rounded-lg border-dashed hover:border-primary hover:bg-primary/5 hover:text-primary transition-all gap-2 w-full sm:w-auto"
            >
              <Plus className="size-4" />
              <span className="font-bold">Tạo đơn</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            Tổng quan
          </h3>
          <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-lg border border-border/50">
            <label
              htmlFor="month-select"
              className="text-xs font-semibold text-muted-foreground/80 whitespace-nowrap px-1"
            >
              THÁNG:
            </label>
            <select
              id="month-select"
              value={selectValue}
              onChange={handleMonthChange}
              className="flex h-8 min-w-32 rounded-md border-none bg-transparent px-2 py-0 text-sm font-bold text-primary focus-visible:outline-none focus-visible:ring-0 cursor-pointer"
            >
              {availableMonths.map(({ month, year }) => (
                <option key={`${month}-${year}`} value={`${month}-${year}`}>
                  {month}/{year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Tổng giờ làm",
              value: summary.totalHours,
              icon: Clock3,
              color: "text-blue-500",
              bgColor: "bg-blue-50",
            },
            {
              label: "Đi làm",
              value: summary.presentDays,
              icon: CheckCircle2,
              color: "text-green-500",
              bgColor: "bg-green-50",
            },
            {
              label: "Nghỉ phép",
              value: summary.leaveDays,
              icon: History,
              color: "text-orange-500",
              bgColor: "bg-orange-50",
            },
            {
              label: "Vắng mặt",
              value: summary.absentDays,
              icon: AlertCircle,
              color: "text-red-500",
              bgColor: "bg-red-50",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-card p-5 rounded-xl border shadow-sm flex flex-col gap-3 hover:border-primary/50 transition-all hover:shadow-md group relative overflow-hidden"
            >
              <div className={cn("size-10 rounded-lg flex items-center justify-center shrink-0", item.bgColor)}>
                <item.icon className={cn("size-5", item.color)} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-foreground">
                  {item.value}
                </span>
                <span className="text-[11px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">
                  {item.label}
                </span>
              </div>
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                <item.icon className="size-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AttendanceTable data={attendanceData} />
    </div>
  );
}
