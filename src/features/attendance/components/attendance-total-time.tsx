import { cn } from "@/lib/utils";

interface AttendanceTotalTimeProps {
  hours: string;
  variant?: "default" | "compact";
  className?: string;
}

export function AttendanceTotalTime({ hours, variant = "default", className }: AttendanceTotalTimeProps) {
  if (!hours || hours === "---" || hours === "0h" || hours === "00 giờ 00 phút") {
    return <span className="text-muted-foreground/30 font-bold tabular-nums">---</span>;
  }

  const hMatch = hours.match(/(\d+)\s*(?:h|giờ)/i);
  const pMatch = hours.match(/(\d+)\s*(?:p|phút)/i);
  
  const h = hMatch ? hMatch[1] : "0";
  const p = pMatch ? pMatch[1] : "0";

  if (variant === "compact") {
    const decimalHours = (parseInt(h) + parseInt(p) / 60).toFixed(1).replace(".0", "");
    return (
      <span className={cn(
        "inline-flex items-center px-2 py-1 rounded bg-muted text-muted-foreground font-bold tabular-nums text-xs border border-border",
        className
      )}>
        {decimalHours}h
      </span>
    );
  }

  return (
    <div className={cn(
      "inline-flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 bg-primary/5 text-primary border border-primary/10 rounded-md px-3 py-1.5 min-w-[80px] sm:min-w-[150px] transition-all hover:bg-primary/10",
      className
    )}>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-bold tabular-nums text-[13px] sm:text-[14px]">
          {h.padStart(2, '0')}
        </span>
        <span className="text-[10px] sm:text-[12px] font-medium opacity-80 lowercase">giờ</span>
      </div>
      
      <div className="hidden sm:block w-px h-3 bg-primary/20 mx-0.5" />

      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-bold tabular-nums text-[13px] sm:text-[14px]">
          {p.padStart(2, '0')}
        </span>
        <span className="text-[10px] sm:text-[12px] font-medium opacity-80 lowercase">phút</span>
      </div>
    </div>
  );
}
