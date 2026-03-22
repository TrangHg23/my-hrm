import React, { useMemo } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { AttendanceRecord, WorkSession } from "../types/attendance";
import { Clock3 } from "lucide-react";
import {
  getDayOfWeek,
  formatWorkHours,
  groupDataByWeek,
} from "../utils/attendance";
import { AttendanceSessionItem } from "./attendance-session-item";
import { AttendanceStatusBadge } from "./attendance-status-badge";

interface AttendanceTableProps {
  data: AttendanceRecord[];
}

export function AttendanceTable({ data }: AttendanceTableProps) {
  const weeks = useMemo(() => groupDataByWeek(data), [data]);

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Clock3 className="w-6 h-6 text-primary" />
          Báo cáo chấm công chi tiết
        </h2>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-md overflow-hidden flex flex-col h-175">
        <div className="flex-1 overflow-auto custom-scrollbar text-[13px]">
          <table className="w-full border-collapse">
            <TableHeader className="bg-muted/50 sticky top-0 z-20 backdrop-blur-md border-b-2">
              <TableRow className="hover:bg-transparent uppercase text-[11px] tracking-wider">
                <TableHead className="w-27.5 font-bold text-foreground py-4 px-6 text-center">
                  Thứ
                </TableHead>
                <TableHead className="w-25 font-bold text-foreground py-4 text-center">
                  Ngày
                </TableHead>
                <TableHead className="w-20 font-bold text-foreground py-4 text-center">
                  Số ca
                </TableHead>
                <TableHead className="w-95 font-bold text-foreground py-4 px-4 text-center">
                  Chi tiết các ca làm việc
                </TableHead>
                <TableHead className="w-50 font-bold text-foreground py-4 text-center">
                  Tổng thời gian
                </TableHead>
                <TableHead className="w-35 font-bold text-foreground py-4 text-center">
                  Trạng thái
                </TableHead>
                <TableHead className="font-bold text-foreground py-4 px-6 text-left">
                  Ghi chú
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeks.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-40 text-center text-muted-foreground italic"
                  >
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                weeks.map((weekData, weekIndex) => (
                  <React.Fragment key={weekIndex}>
                    <TableRow className="bg-muted/40 hover:bg-muted/40 border-y border-border/60">
                      <TableCell
                        colSpan={7}
                        className="py-2.5 px-6 font-bold text-primary/80 uppercase tracking-wider text-[11px]"
                      >
                        TUẦN {weeks.length - weekIndex}
                      </TableCell>
                    </TableRow>
                    {weekData.map((row) => {
                      const dayInfo = getDayOfWeek(row.date);
                      const isSunday = dayInfo.isSunday;

                      return (
                        <TableRow
                          key={row.date}
                          className={cn(
                            "group transition-all border-b border-border/40",
                            isSunday
                              ? "bg-destructive/5 hover:bg-destructive/10 font-medium"
                              : "hover:bg-muted/30",
                          )}
                        >
                          <TableCell
                            className={cn(
                              "py-4 px-6 text-center font-bold border-r border-border/30",
                              isSunday
                                ? "text-destructive"
                                : "text-foreground/70",
                            )}
                          >
                            {dayInfo.name}
                          </TableCell>

                          <TableCell className="font-bold text-foreground py-4 text-center border-r border-border/30 tabular-nums">
                            {row.date}
                          </TableCell>

                          <TableCell className="py-4 text-center">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-foreground font-bold border shadow-none text-[11px]">
                              {row.sessions.length}
                            </span>
                          </TableCell>

                          <TableCell className="py-3 px-4">
                            <div className="grid grid-cols-2 gap-2 max-w-85 mx-auto">
                              {row.sessions.length > 0 ? (
                                row.sessions.map((s: WorkSession, idx: number) => (
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
                            <span className="font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-md border border-primary/10">
                              {formatWorkHours(row.workHours)}
                            </span>
                          </TableCell>

                          <TableCell className="py-4 px-2 text-center">
                            <AttendanceStatusBadge 
                              status={row.type} 
                              label={row.status} 
                            />
                          </TableCell>

                          <TableCell
                            className="py-4 px-6 text-muted-foreground text-[11px] italic leading-tight"
                            title={row.note}
                          >
                            {row.note || "---"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </table>
        </div>

        <div className="bg-card px-6 py-4 border-t flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground italic">
            * Báo cáo được nhóm theo từng tuần. Cuộn lên/xuống để xem toàn bộ dữ
            liệu trong tháng.
          </p>
        </div>
      </div>
    </div>
  );
}
