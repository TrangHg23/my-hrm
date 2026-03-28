"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatVietnameseDate, getVNDateKey } from "@/utils/date";
import { useCheckInCheckOut } from "@/features/attendance/hooks/use-checkin-checkout";
import { useMyAttendance } from "@/features/attendance/hooks/use-attendance";
import { LeaveRequestModal } from "@/features/leave/components/leave-request-modal";
import { useAuthStore } from "@/features/auth/stores/auth";
import { UserRole } from "@/enums/user";
import { GreetingHeader } from "@/components/layouts/greeting-header";
import { Typography } from "@/components/ui/typography";

interface AttendanceCardProps {
  subtitle?: React.ReactNode;
}

export function AttendanceCard({ subtitle }: AttendanceCardProps = {}) {
  const user = useAuthStore((state) => state.user);
  const isEmployee = user?.role === UserRole.EMPLOYEE;
  const today = useMemo(() => new Date(), []);
  
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentCheckInTime, setCurrentCheckInTime] = useState<Date | null>(null);

  // We fetch today's status. useMyAttendance with no params should fetch current month.
  const { data: attendanceResponse } = useMyAttendance({});

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

  return (
    <div className="bg-card rounded-xl border p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      {!isEmployee ? (
        <div className="flex items-start text-left min-w-0 flex-1">
          <GreetingHeader name={user?.name} fallbackName="Admin" subtitle={subtitle} />
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-foreground">
            <Calendar className="size-5 text-primary" />
            <Typography as="span" variant="h3">{capitalizedDate}</Typography>
          </div>
          <Typography as="p" variant="body-sm" className="text-muted-foreground">
            Sẵn sàng để bắt đầu một ngày làm việc hiệu quả!
          </Typography>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        {!isEmployee ? (
          <div className="flex flex-col gap-1.5 md:items-end w-full">
            <div className="flex items-center justify-start md:justify-end gap-2 text-foreground">
              <Calendar className="size-5 text-primary" />
              <Typography as="span" variant="h3">{capitalizedDate}</Typography>
            </div>
            <Typography as="p" variant="body-sm" className="text-muted-foreground md:text-right">
              Sẵn sàng để bắt đầu một ngày làm việc hiệu quả!
            </Typography>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
