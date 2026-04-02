import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EmployeeStatus } from "../types/employees";

interface EmployeeStatusBadgeProps {
  status: EmployeeStatus | string;
  className?: string;
}

export function EmployeeStatusBadge({ status, className }: EmployeeStatusBadgeProps) {
  const config: Record<string, { variant: "success" | "warning" | "destructive" | "secondary"; label: string }> = {
    [EmployeeStatus.WORKING]: {
      variant: "success",
      label: "Đang làm việc",
    },
    [EmployeeStatus.PROBATION]: {
      variant: "warning",
      label: "Thử việc",
    },
    [EmployeeStatus.RESIGNED]: {
      variant: "destructive",
      label: "Đã nghỉ việc",
    },
  };

  const current = config[status] || { variant: "secondary", label: status };

  return (
    <Badge
      variant={current.variant}
      className={cn("px-3 py-1 border-none gap-2 font-semibold rounded-full", className)}
    >
      <span
        className={cn(
          "block h-1.5 w-1.5 shrink-0 rounded-full",
          current.variant === "success" && "bg-success animate-pulse",
          current.variant === "warning" && "bg-warning",
          current.variant === "destructive" && "bg-destructive",
          current.variant === "secondary" && "bg-secondary-foreground/40"
        )}
      />
      {current.label}
    </Badge>
  );
}
