import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendanceSessionItemProps {
  inTime: string;
  outTime: string | null;
}

export function AttendanceSessionItem({ inTime, outTime }: AttendanceSessionItemProps) {
  return (
    <div className="flex items-center gap-1.5 bg-background border border-border rounded-md px-2.5 py-1.5 shadow-sm justify-center group-hover:border-primary/30 transition-colors w-[180px]">
      <span className="text-primary font-bold tabular-nums text-[12px] whitespace-nowrap">
        {inTime}
      </span>
      <ArrowRight className="w-3 h-3 text-muted-foreground/40 shrink-0" />
      <span
        className={cn(
          "font-bold tabular-nums text-[12px] whitespace-nowrap",
          outTime
            ? "text-primary"
            : "text-warning animate-pulse font-extrabold",
        )}
      >
        {outTime || "CHỜ RA"}
      </span>
    </div>
  );
}
