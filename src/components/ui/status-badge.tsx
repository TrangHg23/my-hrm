import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected";
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = {
    pending: {
      variant: "warning" as const,
      dotClass: "bg-warning",
      displayText: label || "Đang chờ duyệt",
      animate: true,
    },
    approved: {
      variant: "success" as const,
      dotClass: "bg-success",
      displayText: label || "Đã phê duyệt",
      animate: false,
    },
    rejected: {
      variant: "destructive" as const,
      dotClass: "bg-destructive",
      displayText: label || "Đã từ chối",
      animate: false,
    },
  };

  const current = config[status] || config.pending;

  return (
    <Badge
      variant={current.variant}
      className={cn("px-2.5 py-1 border-none gap-2 font-semibold", className)}
    >
      <span
        className={cn(
          "block w-2 h-2 shrink-0 rounded-full",
          current.dotClass,
          current.animate && "animate-pulse",
        )}
      />
      {current.displayText}
    </Badge>
  );
}
