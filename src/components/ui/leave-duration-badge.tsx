"use client";

import { Calendar, Clock } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { formatTimeVN } from "@/utils/date";

interface LeaveDurationBadgeProps {
  isFullDay: boolean;
  startTime?: string | null;
  endTime?: string | null;
  className?: string;
}

export function LeaveDurationBadge({
  isFullDay,
  startTime,
  endTime,
  className,
}: LeaveDurationBadgeProps) {
  const style = isFullDay
    ? "bg-amber-50 text-amber-700 border-amber-200/50"
    : "bg-blue-50 text-blue-700 border-blue-200/50";
  
  const Icon = isFullDay ? Calendar : Clock;
  const label = isFullDay 
    ? "Cả ngày" 
    : `${formatTimeVN(startTime)} - ${formatTimeVN(endTime)}`;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg border shadow-sm w-[130px] shrink-0 transition-colors",
        style,
        className
      )}
    >
      <Icon className="size-3.5 shrink-0" />
      <Typography
        variant="body-sm"
        as="span"
        className="font-bold text-xs leading-none whitespace-nowrap"
      >
        {label}
      </Typography>
    </div>
  );
}
