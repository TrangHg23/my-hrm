"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LeaveRequest } from "@/features/leave/types/leave";
import { Typography } from "@/components/ui/typography";
import { Check, AlertCircle, Loader2, Info } from "lucide-react";

interface ProcessLeaveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: LeaveRequest | null;
  type: "approve" | "reject" | null;
  onConfirm: (id: string, reason?: string) => void;
  isLoading: boolean;
}

export function ProcessLeaveModal({
  open,
  onOpenChange,
  request,
  type,
  onConfirm,
  isLoading,
}: ProcessLeaveModalProps) {
  const [reason, setReason] = useState("");

  // Reset lý do khi đóng modal
  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  if (!request) return null;

  const isApprove = type === "approve";

  // Cấu hình giao diện theo loại hành động
  const config = {
    approve: {
      title: "Phê duyệt đơn xin nghỉ",
      icon: <Check className="h-7 w-7 text-emerald-600" />,
      iconBg: "bg-emerald-100",
      confirmText: "Đồng ý duyệt",
      buttonClass:
        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-100",
      borderNormal: "border-emerald-200",
      borderFocus: "focus-visible:border-emerald-500",
    },
    reject: {
      title: "Từ chối đơn xin nghỉ",
      icon: <AlertCircle className="h-7 w-7 text-amber-600" />,
      iconBg: "bg-amber-100/80",
      confirmText: "Xác nhận từ chối",
      buttonClass:
        "bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-100",
      borderNormal: "border-amber-200",
      borderFocus: "focus-visible:border-amber-500",
    },
  };

  const currentConfig = isApprove ? config.approve : config.reject;

  const handleConfirm = () => {
    if (!isApprove && !reason.trim()) return;
    onConfirm(request.id, reason.trim());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25 border-none shadow-2xl p-6">
        <DialogHeader>
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${currentConfig.iconBg} transition-colors duration-300`}
          >
            {currentConfig.icon}
          </div>
          <DialogTitle className="text-center typo-h2 text-slate-900">
            {currentConfig.title}
          </DialogTitle>
          <DialogDescription className="text-center typo-body-sm text-slate-500 pt-2">
            {isApprove
              ? `Xác nhận phê duyệt yêu cầu nghỉ phép của `
              : `Vui lòng nhập lý do từ chối đơn xin nghỉ của `}
            <Typography as="span" variant="body-sm" className="font-bold text-slate-900">
              {request.user.name}
            </Typography>
            ?
          </DialogDescription>

          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-1">
              <Info className="size-4 text-slate-400" />
              <Typography as="span" variant="label-caps" className="text-slate-400 uppercase tracking-[0.2em]">Lý do nghỉ phép</Typography>
            </div>
            <Typography variant="body-sm" as="p" className="text-slate-600 font-medium leading-relaxed italic">
              &ldquo;{request.reason || "Không có lý do cụ thể"}&rdquo;
            </Typography>
          </div>
        </DialogHeader>

        {!isApprove && (
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label
                htmlFor="reason"
                className="typo-label-md text-slate-700 flex items-center gap-1"
              >
                Lý do từ chối <span className="text-rose-500 font-bold">*</span>
              </Label>
              <Textarea
                id="reason"
                placeholder="Nhập lý do cụ thể để nhân viên nắm rõ..."
                className={`
                  min-h-30 resize-none bg-white border-2 transition-all duration-200 rounded-lg placeholder:text-slate-400
                  /* Loại bỏ viền đen/xanh mặc định của Shadcn */
                  focus-visible:ring-0 focus-visible:ring-offset-0 
                  /* Áp dụng màu viền theo config */
                  ${currentConfig.borderNormal} 
                  ${currentConfig.borderFocus}
                `}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full sm:w-1/2 typo-body-md border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200"
          >
            Hủy bỏ
          </Button>
          <Button
            type="button"
            className={`w-full sm:w-1/2 typo-body-md font-bold transition-all border-none ${currentConfig.buttonClass}`}
            onClick={handleConfirm}
            disabled={isLoading || (!isApprove && !reason.trim())}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý
              </>
            ) : (
              currentConfig.confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
