import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type AttendanceStatusType = 
  | "present" 
  | "leave" 
  | "absent" 
  | "working" 
  | "success" 
  | "warning" 
  | "danger" 
  | "secondary"
  | string;

interface AttendanceStatusBadgeProps {
  status: AttendanceStatusType;
  label: string;
  className?: string;
}

export function AttendanceStatusBadge({ status, label, className }: AttendanceStatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const s = status.toLowerCase();
    
    if (s.includes("present") || s.includes("success") || s.includes("đi làm") || s.includes("đang làm việc")) {
      return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
    }
    if (s.includes("leave") || s.includes("warning") || s.includes("nghỉ phép")) {
      return "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200";
    }
    if (s.includes("absent") || s.includes("danger") || s.includes("vắng mặt")) {
      return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
    }
    
    return "bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200";
  };

  return (
    <Badge
      variant="outline"
      className={cn("whitespace-nowrap font-medium px-3 py-1", getStatusStyles(status), className)}
    >
      {label}
    </Badge>
  );
}
