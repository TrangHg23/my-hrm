"use client";

import { Eye, Edit, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/date";
import { useAuthStore } from "@/features/auth/stores/auth";
import { useEmployeeModalStore } from "../stores/employee-modal";
import { useToggleEmployeeActive } from "../hooks/use-toggle-active";
import { EmployeeStatusBadge } from "./employee-status-badge";
import { Employee } from "../types/employees";
import { AccountStatusModal } from "./account-status-modal";
import { useState } from "react";

interface EmployeeManagementTableProps {
  data: Employee[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function EmployeeManagementTable({
  data,
  isLoading,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: EmployeeManagementTableProps) {
  const user = useAuthStore((state) => state.user);
  const { openUpdateForm, openDetail } = useEmployeeModalStore();
  const { mutate: toggleActive, isPending: isToggling } = useToggleEmployeeActive();

  const [targetEmployee, setTargetEmployee] = useState<Employee | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const handleConfirmToggle = () => {
    if (targetEmployee) {
      toggleActive(
        { id: targetEmployee.id, isActive: !targetEmployee.isActive },
        {
          onSettled: () => {
            setIsStatusModalOpen(false);
            setTargetEmployee(null);
          },
        }
      );
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden h-[calc(100vh-210px)] min-h-[400px]">
      <div className="flex-1 overflow-auto relative">
        <table className="w-full caption-bottom text-sm min-w-275 border-collapse">
          <TableHeader className="bg-muted sticky top-0 z-20 border-b">
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="w-24 py-4 font-bold text-foreground">
                Mã nhân viên
              </TableHead>
              <TableHead className="font-bold text-foreground">Họ và tên</TableHead>
              <TableHead className="font-bold text-foreground">Email</TableHead>
              <TableHead className="font-bold text-foreground">
                Số điện thoại
              </TableHead>
              <TableHead className="font-bold text-foreground">Ngày tạo</TableHead>
              <TableHead className="font-bold text-foreground">Trạng thái</TableHead>
              <TableHead className="font-bold text-foreground">Người tạo</TableHead>
              <TableHead className="text-right sticky right-0 bg-muted/95 backdrop-blur-sm z-20 w-44 font-bold before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    < Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  Không tìm thấy nhân viên nào.
                </TableCell>
              </TableRow>
            ) : (
              data.map((employee: any) => (
                <TableRow
                  key={employee.id}
                  className="group hover:bg-muted transition-colors"
                >
                  <TableCell className="font-semibold text-muted-foreground uppercase text-xs">
                    {employee.empCode}
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {employee.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {employee.email}
                  </TableCell>
                  <TableCell>{employee.phone || "---"}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(employee.createdAt)}
                  </TableCell>
                  <TableCell>
                    <EmployeeStatusBadge status={employee.status} />
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                      {user?.name || "Admin"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right sticky right-0 bg-background group-hover:bg-muted transition-colors z-10 w-44 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
                    <div className="flex items-center justify-end gap-3">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                          title="Xem chi tiết"
                          onClick={() => openDetail(employee.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                          title="Cập nhật"
                          onClick={() => openUpdateForm(employee)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center pl-2 border-l border-border/50">
                        <Switch
                          size="sm"
                          checked={employee.isActive}
                          disabled={isToggling || employee.status === "RESIGNED"}
                          onCheckedChange={() => {
                            setTargetEmployee(employee);
                            setIsStatusModalOpen(true);
                          }}
                          title={employee.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
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

      {targetEmployee && (
        <AccountStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => {
            setIsStatusModalOpen(false);
            setTargetEmployee(null);
          }}
          onConfirm={handleConfirmToggle}
          employeeName={targetEmployee.name}
          employeeId={targetEmployee.empCode}
          status={targetEmployee.isActive ? "active" : "inactive"}
        />
      )}
    </div>
  );
}
