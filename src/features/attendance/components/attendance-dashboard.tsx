"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Calendar,
  History,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatVietnameseDate, getVNDateKey } from "@/utils/date";
import { AttendanceTable } from "./attendance-table";
import { GreetingHeader } from "@/components/ui/greeting-header";
import { getAvailableMonths } from "../utils/attendance";
import { useCheckInCheckOut } from "@/features/attendance/hooks/use-checkin-checkout";
import { useMyAttendance } from "@/features/attendance/hooks/use-attendance";
import { mapAttendanceList } from "@/features/attendance/mapper/attendance";
import { LeaveRequestModal } from "@/features/leave/components/leave-request-modal";

export function AttendanceDashboard() {
  const user = useAuthStore((state) => state.user);

  const today = useMemo(() => new Date(), []);
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentCheckInTime, setCurrentCheckInTime] = useState<Date | null>(
    null,
  );

  const { data: attendanceResponse } = useMyAttendance({
    month: selectedMonth,
    year: selectedYear,
  });

  useEffect(() => {
    if (attendanceResponse?.data) {
      const rawData = attendanceResponse.data;
      if (!rawData || rawData.length === 0) {
        setIsCheckedIn(false);
        setCurrentCheckInTime(null);
        return;
      }

      const todayKey = getVNDateKey(today);
      const latestRecord = rawData.find(
        (r: any) => getVNDateKey(r.date) === todayKey,
      );

      const openSession = latestRecord?.sessions?.find(
        (s: any) => !s.checkoutTime,
      );

      setIsCheckedIn(!!openSession);
      if (openSession) {
        setCurrentCheckInTime(new Date(openSession.checkinTime));
      } else {
        setCurrentCheckInTime(null);
      }
    }
  }, [attendanceResponse, today]);

  const { mutate: mutateCheckinCheckout, isPending: isUpdatingAttendance } =
    useCheckInCheckOut();

  const handleCheckInOut = () => {
    mutateCheckinCheckout(undefined, {
      onSuccess: (data) => {
        setIsCheckedIn(data.isCheckIn);
        setCurrentCheckInTime(data.checkinTime);
      },
    });
  };

  const capitalizedDate = formatVietnameseDate(today);

  const attendanceData = useMemo(
    () => mapAttendanceList(attendanceResponse?.data || []),
    [attendanceResponse],
  );

  const summary = useMemo(() => {
    const rawData = attendanceResponse?.data || [];
    return {
      totalHours: rawData
        .reduce((sum: number, r: any) => sum + (r.totalHours || 0), 0)
        .toFixed(1),
      presentDays: rawData.filter((r: any) => r.status === "PRESENT").length,
      leaveDays: rawData.filter((r: any) => r.status === "LEAVE").length,
      absentDays: 0,
    };
  }, [attendanceResponse]);

  // Generate last 12 months for dropdown
  const availableMonths = useMemo(
    () => getAvailableMonths(currentYear, currentMonth),
    [currentYear, currentMonth],
  );

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [m, y] = e.target.value.split("-");
    setSelectedMonth(parseInt(m, 10));
    setSelectedYear(parseInt(y, 10));
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
              disabled={isUpdatingAttendance}
              className={cn(
                "h-11 px-8 group relative overflow-hidden text-primary-foreground rounded-lg transition-all hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed",
                isCheckedIn
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-primary hover:bg-primary/90",
              )}
            >
              <span className="relative z-10 font-bold uppercase tracking-wide">
                {isUpdatingAttendance
                  ? "Đang xử lý..."
                  : isCheckedIn
                    ? "Check-Out Ngay"
                    : "Check-In Ngay"}
              </span>
              {!isUpdatingAttendance && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              )}
            </button>

            <LeaveRequestModal>
              <Button
                variant="outline"
                className="h-11 px-6 rounded-lg border-dashed hover:border-primary hover:bg-primary/5 hover:text-primary transition-all gap-2 w-full sm:w-auto"
              >
                <Plus className="size-4" />
                <span className="font-bold">Tạo đơn</span>
              </Button>
            </LeaveRequestModal>
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
              {availableMonths.map(
                ({ month, year }: { month: number; year: number }) => (
                  <option key={`${month}-${year}`} value={`${month}-${year}`}>
                    {month}/{year}
                  </option>
                ),
              )}
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
              <div
                className={cn(
                  "size-10 rounded-lg flex items-center justify-center shrink-0",
                  item.bgColor,
                )}
              >
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
