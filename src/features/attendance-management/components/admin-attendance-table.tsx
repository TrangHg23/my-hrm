"use client";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { AdminAttendanceRecord, AdminWorkSession } from "../types/attendance-management";
import { Loader2 } from "lucide-react";
import { getStatusConfig } from "../utils/attendance";
import { Typography } from "@/components/ui/typography";
import { AttendanceSessionItem } from "@/features/attendance/components/attendance-session-item";
import { AttendanceStatusBadge } from "@/features/attendance/components/attendance-status-badge";
import { AttendanceTotalTime } from "@/features/attendance/components/attendance-total-time";

type AdminAttendanceTableProps = {
  data: AdminAttendanceRecord[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function AdminAttendanceTable({
  data,
  isLoading,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: AdminAttendanceTableProps) {

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden h-[calc(100vh-210px)] min-h-[400px] w-full max-w-full">
      <div className="flex-1 overflow-auto relative custom-scrollbar">
        <table className="w-full caption-bottom text-sm min-w-[1050px] border-collapse">
          <TableHeader className="bg-muted sticky top-0 z-20 border-b">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="w-[100px] py-4 sticky left-0 bg-muted z-20 before:absolute before:inset-y-0 before:right-0 before:w-px before:bg-border shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                <Typography as="span" variant="body-sm" className="font-bold text-foreground">Mã nhân viên</Typography>
              </TableHead>
              <TableHead className="w-[150px]">
                <Typography as="span" variant="body-sm" className="font-bold text-foreground">Nhân viên</Typography>
              </TableHead>
              <TableHead className="w-[120px] text-center">
                <Typography as="span" variant="body-sm" className="font-bold text-foreground">Số ca</Typography>
              </TableHead>
              <TableHead className="w-[300px] text-center">
                <Typography as="span" variant="body-sm" className="font-bold text-foreground">Chi tiết các ca làm việc</Typography>
              </TableHead>
              <TableHead className="w-[150px] text-center whitespace-nowrap">
                <Typography as="span" variant="body-sm" className="font-bold text-foreground">Tổng thời gian làm việc</Typography>
              </TableHead>
              <TableHead className="w-[140px] text-center py-4">
                <Typography as="span" variant="body-sm" className="font-bold text-foreground">Trạng thái</Typography>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Không tìm thấy dữ liệu chấm công cho ngày này.
                </TableCell>
              </TableRow>
            ) : (
              data.map((record) => {
                const statusConfig = getStatusConfig(record.status);
                return (
                  <TableRow
                    key={record.id}
                    className="group hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-semibold text-muted-foreground uppercase text-xs sticky left-0 bg-card group-hover:bg-muted transition-colors z-10 before:absolute before:inset-y-0 before:right-0 before:w-px before:bg-border shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                      {record.employeeCode}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <Typography as="span" variant="body-sm" className="font-semibold text-foreground">{record.employeeName}</Typography>
                        <Typography as="span" variant="helper" className="text-muted-foreground">{record.employeeEmail}</Typography>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-foreground font-bold border shadow-none text-[11px]">
                        {record.sessions.length}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex flex-wrap items-center justify-center gap-2 max-w-[420px] mx-auto">
                        {record.sessions.length > 0 ? (
                          record.sessions.map((s: AdminWorkSession, idx: number) => (
                            <AttendanceSessionItem
                              key={idx}
                              inTime={s.in}
                              outTime={s.out}
                            />
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-1.5 text-muted-foreground/40 font-bold text-[10px] tracking-widest italic border border-dashed rounded-md">
                            NGHỈ
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <AttendanceTotalTime hours={record.totalHours} variant="compact" />
                    </TableCell>
                    <TableCell className="text-center w-32 py-4">
                      <div className="flex justify-center px-2">
                        <AttendanceStatusBadge 
                          status={record.status} 
                          label={statusConfig.label} 
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
