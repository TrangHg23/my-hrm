"use client";

import { useState } from "react";
import { User, Check, X, Info, AlertCircle } from "lucide-react";
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
  TooltipArrow,
} from "@/components/ui/tooltip";
import { TablePagination } from "@/components/ui/table-pagination";
import { LeaveDurationBadge } from "@/components/ui/leave-duration-badge";
import { LeaveRequest } from "@/features/leave/types/leave";
import { useApproveLeaveRequest } from "../hooks/use-approve-leave-request";
import { useRejectLeaveRequest } from "../hooks/use-reject-leave-request";
import { ProcessLeaveModal } from "./process-leave-modal";

interface LeaveManagementTableProps {
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

export function LeaveManagementTable({
  data,
  isLoading,
  pagination,
}: LeaveManagementTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState<LeaveRequest | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

  const { mutate: approveRequest, isPending: isApproving } = useApproveLeaveRequest();
  const { mutate: rejectRequest, isPending: isRejecting } = useRejectLeaveRequest();

  const handleApproveClick = (request: LeaveRequest) => {
    setActiveRequest(request);
    setActionType("approve");
    setModalOpen(true);
  };

  const handleRejectClick = (request: LeaveRequest) => {
    setActiveRequest(request);
    setActionType("reject");
    setModalOpen(true);
  };

  const handleConfirm = (id: string, reason?: string) => {
    if (actionType === "approve") {
      approveRequest(id, {
        onSuccess: () => setModalOpen(false),
      });
    } else if (actionType === "reject" && reason) {
      rejectRequest(
        { id, rejectReason: reason },
        { onSuccess: () => setModalOpen(false) }
      );
    }
  };
  return (
    <TooltipProvider>
      <div className="rounded-xl border border-slate-200 bg-white shadow-md flex flex-col overflow-hidden h-[calc(100vh-260px)] min-h-125">
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
                  <Typography variant="body-sm" className="font-bold text-slate-900 whitespace-nowrap">Thời gian tạo</Typography>
                </TableHead>
                <TableHead>
                  <Typography variant="body-sm" className="font-bold text-slate-900 whitespace-nowrap">Thời gian nghỉ</Typography>
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
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center">
                    <Typography variant="body-sm" className="text-slate-400 italic">Đang tải dữ liệu...</Typography>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center">
                    <Typography variant="body-sm" className="text-slate-400 italic">Không có yêu cầu nào cần xử lý.</Typography>
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                data.map((request) => (
                  <TableRow
                    key={request.id}
                    className="group hover:bg-slate-50/60 transition-colors border-b last:border-0"
                  >
                    <TableCell className="pl-6 py-4 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-10 w-48 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                          <User className="size-4 text-primary" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <Typography
                            variant="body-sm"
                            className="font-bold text-slate-900 truncate"
                          >
                            {request.user.name}
                          </Typography>
                          <Typography
                            variant="helper"
                            className="text-slate-400 truncate"
                          >
                            {request.user.email}
                          </Typography>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <Typography
                        variant="body-sm"
                        className="font-mono text-slate-600 uppercase tracking-wider font-bold"
                      >
                        #{request.id.slice(0, 6)}
                      </Typography>
                    </TableCell>

                    <TableCell className="py-4">
                      <Typography
                        variant="helper"
                        className="text-slate-500 font-medium not-italic"
                      >
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
                          <Typography as="span" variant="label-caps" className="text-slate-400 w-6 uppercase">Từ</Typography>
                          <Typography as="span" variant="body-sm" className="font-bold text-slate-700 whitespace-nowrap">
                            {formatDate(request.fromDate)}
                          </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                          <Typography as="span" variant="label-caps" className="text-slate-400 w-6 uppercase">Đến</Typography>
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
                      {request.reason ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Typography
                              variant="body-sm"
                              className="text-slate-600 hover:text-primary cursor-help line-clamp-1 leading-relaxed transition-colors"
                            >
                              {request.reason}
                            </Typography>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            align="start"
                            className="bg-slate-900 text-white border-none p-4 max-w-80 shadow-2xl rounded-xl animate-in fade-in zoom-in duration-200"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-1">
                                <Info className="size-4 text-primary shrink-0" />
                                <Typography variant="helper" className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[10px]">Chi tiết lý do nghỉ</Typography>
                              </div>
                              <Typography variant="body-sm" className="leading-relaxed text-slate-200 whitespace-pre-wrap font-medium">
                                {request.reason}
                              </Typography>
                              <TooltipArrow className="fill-slate-900 border-none" />
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Typography variant="body-sm" className="text-slate-400 italic">---</Typography>
                      )}
                    </TableCell>

                    <TableCell className="py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <StatusBadge
                          status={request.status.toLowerCase() as any}
                        />
                        {request.status.toLowerCase() === "rejected" &&
                          request.rejectReason && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="flex items-center gap-1 text-rose-500 hover:text-rose-600 cursor-help transition-colors">
                                  <Info className="size-3" />
                                  <Typography as="span" variant="label-caps" className="font-bold text-inherit uppercase text-[10px]">
                                    Lý do từ chối
                                  </Typography>
                                </span>
                              </TooltipTrigger>
                              <TooltipContent 
                                side="bottom" 
                                className="bg-slate-900 text-white border-none p-3 max-w-72 shadow-2xl rounded-xl animate-in fade-in zoom-in duration-200"
                              >
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2 border-b border-white/10 pb-1.5 mb-1.5">
                                    <AlertCircle className="size-3.5 text-rose-400" />
                                    <Typography variant="helper" className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Phản hồi từ Admin</Typography>
                                  </div>
                                  <Typography variant="body-sm" className="leading-relaxed whitespace-pre-wrap font-medium">
                                    {request.rejectReason}
                                  </Typography>
                                  <TooltipArrow className="fill-slate-900 border-none" />
                                </div>
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
                            onClick={() => handleApproveClick(request)}
                            disabled={isApproving || isRejecting}
                          >
                            <Check className="size-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200/50 shadow-sm transition-all"
                            title="Từ chối"
                            onClick={() => handleRejectClick(request)}
                            disabled={isApproving || isRejecting}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                      ) : (
                        <Typography
                          variant="helper"
                          className="text-slate-400 font-medium italic"
                        >
                          Đã xử lý bởi {request.processedBy?.name || "Admin"}
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

      <ProcessLeaveModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        request={activeRequest}
        type={actionType}
        onConfirm={handleConfirm}
        isLoading={isApproving || isRejecting}
      />
    </TooltipProvider>
  );
}
