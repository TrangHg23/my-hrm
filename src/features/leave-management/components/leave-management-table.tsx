"use client";

import { User, Check, X, Info } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TablePagination } from "@/components/ui/table-pagination";
import { LeaveDurationBadge } from "@/components/ui/leave-duration-badge";
import { FAKE_LEAVE_REQUESTS } from "./mock-data";

interface LeaveManagementTableProps {
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
  };
}

export function LeaveManagementTable({ pagination }: LeaveManagementTableProps) {
  return (
    <TooltipProvider>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden h-[calc(100vh-280px)] min-h-100">
        <div className="flex-1 overflow-auto relative custom-scrollbar">
          <table className="w-full text-sm min-w-250 border-separate border-spacing-0">
            <TableHeader className="bg-slate-50/80 sticky top-0 z-20 backdrop-blur-md border-b border-slate-200">
              <TableRow>
                <TableHead className="w-48 py-4 pl-6 sticky left-0 bg-slate-50 z-30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                  <Typography variant="body-sm" className="font-bold text-slate-900">Nhân viên</Typography>
                </TableHead>
                <TableHead className="w-24">
                  <Typography variant="body-sm" className="font-bold text-slate-900">Mã đơn</Typography>
                </TableHead>
                <TableHead className="w-40">
                  <Typography variant="body-sm" className="font-bold text-slate-900">Thời gian tạo</Typography>
                </TableHead>
                <TableHead>
                  <Typography variant="body-sm" className="font-bold text-slate-900">Thời gian nghỉ</Typography>
                </TableHead>
                <TableHead className="text-center">
                  <Typography variant="body-sm" className="font-bold text-slate-900">Thời lượng</Typography>
                </TableHead>
                <TableHead>
                  <Typography variant="body-sm" className="font-bold text-slate-900">Lý do nghỉ</Typography>
                </TableHead>
                <TableHead className="text-center">
                  <Typography variant="body-sm" className="font-bold text-slate-900">Trạng thái</Typography>
                </TableHead>
                <TableHead className="text-right pr-6">
                  <Typography variant="body-sm" className="font-bold text-slate-900">Hành động</Typography>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {FAKE_LEAVE_REQUESTS.map((request) => (
                <TableRow key={request.id} className="group hover:bg-slate-50/60 transition-colors border-b last:border-0">
                  <TableCell className="pl-6 py-4 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-10 w-48 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                        <User className="size-4 text-primary" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <Typography variant="body-sm" className="font-bold text-slate-900 truncate">
                          {request.user.name}
                        </Typography>
                        <Typography variant="helper" className="text-slate-400 truncate">
                          {request.user.email}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-4">
                    <Typography variant="body-sm" className="font-mono text-slate-600 uppercase tracking-wider font-bold">
                      #{request.id.split("-").slice(0, 2).join("-")}
                    </Typography>
                  </TableCell>

                  <TableCell className="py-4">
                    <Typography variant="helper" className="text-slate-500 font-medium not-italic">
                      {formatDate(request.createdAt, "dd/MM/yyyy HH:mm")}
                    </Typography>
                  </TableCell>

                  <TableCell className="py-4">
                    {request.fromDate === request.toDate ? (
                      <Typography variant="body-sm" className="font-bold text-slate-900 whitespace-nowrap">
                        {formatDate(request.fromDate)}
                      </Typography>
                    ) : (
                      <div className="flex flex-col border-l-2 border-primary/30 pl-2 py-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 w-6 uppercase">Từ</span>
                          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
                            {formatDate(request.fromDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400 w-6 uppercase">Đến</span>
                          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
                            {formatDate(request.toDate)}
                          </span>
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
                    <Typography variant="body-sm" className="text-slate-600 line-clamp-1 leading-relaxed" title={request.reason}>
                      {request.reason || "---"}
                    </Typography>
                  </TableCell>

                  <TableCell className="py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <StatusBadge status={request.status.toLowerCase() as any} />
                      {request.status.toLowerCase() === "rejected" && request.rejectReason && (
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="flex items-center gap-1 text-rose-500">
                              <Info className="size-3" /> 
                              <Typography variant="helper" className="font-medium text-inherit">Lý do từ chối</Typography>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-900 text-white border-none">
                            <Typography variant="helper" className="max-w-50">{request.rejectReason}</Typography>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="pr-6 py-4 text-right">
                    {request.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-200/50 shadow-sm transition-all"
                          title="Phê duyệt"
                        >
                          <Check className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200/50 shadow-sm transition-all"
                          title="Từ chối"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <Typography variant="helper" className="text-slate-400 font-medium italic">
                        Đã xử lý bởi {request.approverName || "Admin"}
                      </Typography>
                    )}
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
