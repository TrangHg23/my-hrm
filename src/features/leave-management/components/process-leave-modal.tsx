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
import { Check, X, Loader2 } from "lucide-react";

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

  // Reset reason when modal closes or changes
  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  if (!request) return null;

  const isApprove = type === "approve";
  const title = isApprove ? "Phê duyệt đơn xin nghỉ" : "Từ chối đơn xin nghỉ";
  const description = isApprove
    ? `Bạn có chắc chắn muốn duyệt đơn xin nghỉ của ${request.user.name}?`
    : `Vui lòng nhập lý do từ chối đơn xin nghỉ của ${request.user.name}.`;

  const handleConfirm = () => {
    if (!isApprove && !reason.trim()) return;
    onConfirm(request.id, reason.trim());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${isApprove ? 'bg-emerald-100' : 'bg-rose-100'}`}>
            {isApprove ? (
              <Check className="h-6 w-6 text-emerald-600" />
            ) : (
              <X className="h-6 w-6 text-rose-600" />
            )}
          </div>
          <DialogTitle className="text-center text-xl font-bold text-slate-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-slate-500 pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        {!isApprove && (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-semibold text-slate-700">
                Lý do từ chối <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="reason"
                placeholder="Nhập lý do cụ thể..."
                className="min-h-25 resize-none focus-visible:ring-rose-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full sm:w-auto text-slate-500 hover:bg-slate-100"
          >
            Hủy
          </Button>
          <Button
            type="button"
            className={`w-full sm:w-auto font-bold transition-all ${
              isApprove 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200' 
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200'
            }`}
            onClick={handleConfirm}
            disabled={isLoading || (!isApprove && !reason.trim())}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              isApprove ? 'Đồng ý duyệt' : 'Xác nhận từ chối'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
