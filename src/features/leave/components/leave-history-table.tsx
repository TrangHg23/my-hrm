"use client";

import { User, Info } from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/utils/date";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import { TablePagination } from "@/components/ui/table-pagination";
import { LeaveDurationBadge } from "@/components/ui/leave-duration-badge";
import { LeaveRequest } from "../types/leave";

interface LeaveHistoryTableProps {
  data: LeaveRequest[];
  isLoading: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  };
}

export function LeaveHistoryTable({
  data,
  isLoading,
  pagination,
}: LeaveHistoryTableProps) {
  return (
    <TooltipProvider>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden h-[calc(100vh-280px)] min-h-100">
        <div className="flex-1 overflow-auto relative custom-scrollbar">
          <table className="w-full text-sm min-w-225 border-separate border-spacing-0">
            <TableHeader className="bg-slate-50/80 sticky top-0 z-20 backdrop-blur-md border-b border-slate-200">
              <TableRow>
                <TableHead className="w-24 py-4 pl-6">
                  <Typography
                    variant="body-sm"
                    className="font-bold text-slate-900"
                  >
                    Mã đơn
                  </Typography>
                </TableHead>
                <TableHead className="w-40">
                  <Typography
                    variant="body-sm"
                    className="font-bold text-slate-900 whitespace-nowrap"
                  >
                    Thời gian tạo
                  </Typography>
                </TableHead>
                <TableHead className="w-44 sticky left-0 bg-slate-50 z-30">
                  <Typography
                    variant="body-sm"
                    className="font-bold text-slate-900 whitespace-nowrap"
                  >
                    Thời gian nghỉ
                  </Typography>
                </TableHead>
                <TableHead className="text-center">
                  <Typography
                    variant="body-sm"
                    className="font-bold text-slate-900"
                  >
                    Thời lượng
                  </Typography>
                </TableHead>
                <TableHead>
                  <Typography
                    variant="body-sm"
                    className="font-bold text-slate-900"
                  >
                    Lý do nghỉ
                  </Typography>
                </TableHead>
                <TableHead className="min-w-48">
                  <Typography
                    variant="body-sm"
                    className="font-bold text-slate-900 whitespace-nowrap"
                  >
                    Người phê duyệt
                  </Typography>
                </TableHead>
                <TableHead className="text-center pr-6">
                  <Typography
                    variant="body-sm"
                    className="font-bold text-slate-900 whitespace-nowrap"
                  >
                    Trạng thái
                  </Typography>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading &&
                data.map((request) => (
                  <TableRow
                    key={request.id}
                    className="group hover:bg-slate-50/60 transition-colors border-b last:border-0"
                  >
                    <TableCell className="pl-6 py-4 w-24">
                      <Typography
                        variant="body-sm"
                        className="font-mono text-slate-600 uppercase tracking-wider font-bold"
                      >
                        #{request.id.slice(0, 6)}
                      </Typography>
                    </TableCell>

                    <TableCell className="py-4 w-40">
                      <Typography
                        variant="helper"
                        className="text-slate-500 font-medium not-italic"
                      >
                        {formatDate(request.createdAt, "dd/MM/yyyy HH:mm")}
                      </Typography>
                    </TableCell>

                    <TableCell className="py-4 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-10 w-44 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                      {request.fromDate === request.toDate ? (
                        <Typography
                          variant="body-sm"
                          className="font-bold text-slate-900 whitespace-nowrap"
                        >
                          {formatDate(request.fromDate)}
                        </Typography>
                      ) : (
                        <div className="flex flex-col border-l-2 border-primary/30 pl-2 py-0.5">
                          <div className="flex items-center gap-2">
                            <Typography as="span" variant="label-caps" className="text-slate-400 w-6 uppercase">
                              Từ
                            </Typography>
                            <Typography as="span" variant="body-sm" className="font-bold text-slate-700 whitespace-nowrap">
                              {formatDate(request.fromDate)}
                            </Typography>
                          </div>
                          <div className="flex items-center gap-2">
                            <Typography as="span" variant="label-caps" className="text-slate-400 w-6 uppercase">
                              Đến
                            </Typography>
                            <Typography as="span" variant="body-sm" className="font-bold text-slate-700 whitespace-nowrap">
                              {formatDate(request.toDate)}
                            </Typography>
                          </div>
                        </div>
                      )}
                    </TableCell>

                    <TableCell className="py-4 text-center">
                      <LeaveDurationBadge
                        isFullDay={request.isFullDay}
                        startTime={request.startTime}
                        endTime={request.endTime}
                      />
                    </TableCell>

                    <TableCell className="py-4 max-w-50 text-left">
                      <Typography
                        variant="body-sm"
                        className="text-slate-600 line-clamp-1"
                      >
                        {request.reason || "---"}
                      </Typography>
                    </TableCell>

                    <TableCell className="py-4 min-w-48">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                          <User className="size-3.5 text-slate-400" />
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            variant="body-sm"
                            className={cn(
                              "font-medium whitespace-nowrap",
                              request.processedBy?.name
                                ? "text-slate-700"
                                : "text-slate-400",
                            )}
                          >
                            {request.processedBy?.name || "Chưa xác định"}
                          </Typography>
                          {!request.processedBy && (
                            <Typography
                              variant="helper"
                              className="text-slate-400 -mt-0.5 whitespace-nowrap not-italic"
                            >
                              Quản lý trực tiếp
                            </Typography>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="pr-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <StatusBadge
                          status={request.status.toLowerCase() as any}
                        />

                        {request.status.toLowerCase() === "rejected" &&
                          request.rejectReason && (
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger asChild>
                                <button className="flex items-center gap-1 text-amber-600 hover:text-amber-700 transition-colors cursor-help group">
                                  <Info className="size-3.5 group-hover:scale-110 transition-transform" />
                                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                                    Chi tiết từ chối
                                  </span>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent
                                side="bottom"
                                className="bg-amber-50 border border-amber-200 text-amber-950 p-3 shadow-xl max-w-64"
                              >
                                <div className="space-y-1">
                                  <Typography variant="label-caps" className="text-amber-600">
                                    Phản hồi từ Admin:
                                  </Typography>
                                  <Typography variant="body-sm" className="leading-relaxed">
                                    {request.rejectReason}
                                  </Typography>
                                </div>
                                <TooltipArrow className="fill-amber-50 stroke-amber-200" />
                              </TooltipContent>
                            </Tooltip>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </table>
        </div>

        {pagination && (
          <TablePagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={pagination.onPageChange}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
