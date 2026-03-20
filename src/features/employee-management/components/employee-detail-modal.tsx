"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Fingerprint,
  Briefcase,
  X
} from "lucide-react";
import { useDetailEmployee } from "../hooks/use-detail-employee";
import { formatDate } from "@/utils/date";
import { Separator } from "@/components/ui/separator";

import { useEmployeeModalStore } from "../stores/employee-modal";

export function EmployeeDetailModal() {
  const { 
    isDetailOpen: isOpen, 
    selectedEmployeeId: employeeId, 
    closeDetail: onOpenChange 
  } = useEmployeeModalStore();

  const { data: employee, isLoading } = useDetailEmployee(employeeId || "", isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onOpenChange()}>
      <DialogContent showCloseButton={false} className="sm:max-w-125 p-0 overflow-hidden border-none shadow-2xl">
        {/* Header với Background Gradient từ Theme */}
        <div className="h-32 bg-primary-gradient relative">
          <DialogClose className="absolute top-4 right-4 p-1 text-white/70 transition-opacity hover:opacity-100 hover:text-white focus:outline-none disabled:pointer-events-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader className="absolute -bottom-6 left-6 right-6 flex-row items-end gap-4 space-y-0">
            <div className="h-20 w-20 rounded-2xl bg-card border-4 border-background flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-primary">
                {employee?.name ? employee.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <div className="pb-1">
              <DialogTitle className="text-xl font-bold text-primary-foreground drop-shadow-md">
                {employee?.name || "Thông tin nhân viên"}
              </DialogTitle>
              <p className="text-primary-foreground/80 text-xs font-semibold uppercase tracking-widest mt-1">
                {employee?.role || "Staff"}
              </p>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 pt-12 pb-8">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary/60" />
              <p className="text-sm text-muted-foreground animate-pulse">Đang truy xuất dữ liệu...</p>
            </div>
          ) : employee ? (
            <div className="space-y-6">
              {/* Section: Thông tin cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem 
                  icon={<Fingerprint className="h-4 w-4" />} 
                  label="Mã nhân viên" 
                  value={`#${employeeId?.split("-")[0].toUpperCase()}`} 
                />
                <InfoItem 
                  icon={<Briefcase className="h-4 w-4" />} 
                  label="Vai trò" 
                  value={
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/20">
                      {employee.role}
                    </span>
                  } 
                />
              </div>

              <Separator className="bg-border/50" />

              {/* Section: Liên hệ */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Thông tin liên lạc</h4>
                <div className="grid gap-4">
                  <InfoItem 
                    icon={<Mail className="h-4 w-4" />} 
                    label="Địa chỉ Email" 
                    value={employee.email} 
                  />
                  <InfoItem 
                    icon={<Phone className="h-4 w-4" />} 
                    label="Số điện thoại" 
                    value={employee.phone || "Chưa cập nhật"} 
                  />
                </div>
              </div>

              <Separator className="bg-border/50" />

              {/* Section: Hệ thống */}
              <div className="flex items-center justify-between bg-muted/30 p-3 rounded-xl border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-background rounded-lg shadow-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase">Ngày gia nhập</p>
                    <p className="text-sm font-semibold">{formatDate(employee.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full">
                  <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] font-bold uppercase">Đang hoạt động</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="inline-flex p-4 rounded-full bg-destructive/10 text-destructive mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <p className="text-sm text-muted-foreground">Không tìm thấy dữ liệu nhân viên.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="mt-0.5 rounded-lg bg-primary/5 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <div>
        <Label className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
          {label}
        </Label>
        <div className="text-sm font-medium text-foreground mt-0.5">
          {value}
        </div>
      </div>
    </div>
  );
}