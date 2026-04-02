"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";

interface AccountStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
  employeeId: string;
  status: "active" | "inactive";
}

export function AccountStatusModal({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
  employeeId,
  status,
}: AccountStatusModalProps) {
  const isDisabling = status === "active";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[425px] gap-6 p-6"
      >
        <DialogHeader className="gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full 
            ${isDisabling ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
            {isDisabling ? (
              <AlertCircle className="h-6 w-6" />
            ) : (
              <CheckCircle2 className="h-6 w-6" />
            )}
          </div>
          
          <DialogTitle asChild>
            <Typography variant="h2">
              {isDisabling ? "Vô hiệu hóa tài khoản" : "Kích hoạt tài khoản"}
            </Typography>
          </DialogTitle>
          
          <DialogDescription asChild>
            <div className="flex flex-col gap-3">
              <Typography variant="body-sm" className="text-muted-foreground">
                Bạn có chắc chắn muốn {isDisabling ? "vô hiệu hóa" : "kích hoạt lại"} tài khoản của:
              </Typography>
              <div className="flex flex-col rounded-md border border-border bg-muted/30 p-3">
                <Typography variant="body-lg" className="text-foreground">{employeeName}</Typography>
                <Typography variant="helper" className="text-muted-foreground mt-1">
                  Mã nhân viên: {employeeId}
                </Typography>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="bg-accent/50 p-4 rounded-lg border-l-4 border-primary">
          <Typography variant="body-sm" className="text-foreground">
            <strong>Hệ quả:</strong>{" "}
            {isDisabling
              ? "Nhân viên này sẽ ngay lập tức bị đăng xuất và không thể truy cập hệ thống cho đến khi được kích hoạt lại."
              : "Nhân viên sẽ có thể đăng nhập và sử dụng các tính năng theo phân quyền cũ."}
          </Typography>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="secondary" onClick={onClose} asChild>
            <Typography variant="body-md" as="span">Hủy</Typography>
          </Button>
          <Button
            variant={isDisabling ? "destructive" : "default"}
            onClick={onConfirm}
            className={!isDisabling ? "bg-success hover:bg-success/90" : ""}
            asChild
          >
            <Typography variant="body-md" as="span">
              {isDisabling ? "Vô hiệu hóa" : "Kích hoạt lại"}
            </Typography>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
