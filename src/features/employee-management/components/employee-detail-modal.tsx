"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Typography } from "@/components/ui/typography";

import { useEmployeeModalStore } from "../stores/employee-modal";
import { EmployeeStatusBadge } from "./employee-status-badge";

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
              <DialogTitle className="typo-h3 text-primary-foreground drop-shadow-md pb-0.5">
                {employee?.name || "Thông tin nhân viên"}
              </DialogTitle>
              <Typography as="span" variant="label-caps" className="text-primary-foreground/80 mt-1">
                {employee?.role || "Staff"}
              </Typography>
            </div>
          </DialogHeader>
        </div>

        <div className="px-6 pt-12 pb-8">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary/60" />
              <Typography variant="body-sm" className="text-muted-foreground animate-pulse">Đang truy xuất dữ liệu...</Typography>
            </div>
          ) : employee ? (
            <div className="space-y-6">
              {/* Section: Thông tin cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem 
                  icon={<Fingerprint className="h-4 w-4" />} 
                  label="Mã nhân viên" 
                  value={employee.empCode} 
                />
                <InfoItem 
                  icon={<Briefcase className="h-4 w-4" />} 
                  label="Vai trò" 
                  value={
                    <Typography as="span" variant="label-caps" className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-primary border border-primary/20">
                      {employee.role}
                    </Typography>
                  } 
                />
              </div>

              <Separator className="bg-border/50" />

              {/* Section: Liên hệ */}
              <div className="space-y-4">
                <Typography as="h4" variant="label-caps" className="text-muted-foreground/70">Thông tin liên lạc</Typography>
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
                    <Typography variant="label-caps" className="text-muted-foreground">Ngày gia nhập</Typography>
                    <Typography variant="body-sm" className="font-semibold">{formatDate(employee.createdAt)}</Typography>
                  </div>
                </div>
                <EmployeeStatusBadge status={employee.status} />
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="inline-flex p-4 rounded-full bg-destructive/10 text-destructive mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <Typography as="p" variant="body-sm" className="text-muted-foreground">Không tìm thấy dữ liệu nhân viên.</Typography>
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
        <Typography as="label" variant="label-caps" className="text-muted-foreground tracking-wider">
          {label}
        </Typography>
        <Typography variant="body-sm" className="mt-0.5">
          {value}
        </Typography>
      </div>
    </div>
  );
}