"use client";

import { useState } from "react";
import { formatDate } from "@/utils/date";
import { Search, Eye, Edit, Loader2 } from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/auth";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetEmployees } from "@/features/employee-management/hooks/use-get-employees";
import { CreateEmployeeModal } from "@/features/employee-management/components/create-employee-modal";
import { EmployeeDetailModal } from "@/features/employee-management/components/employee-detail-modal";

export default function EmployeeManagementPage() {
  const user = useAuthStore((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const itemsPerPage = 10;

  const { data, isLoading } = useGetEmployees(currentPage, itemsPerPage);

  const handleViewStatus = (id: string) => {
    setSelectedEmployeeId(id);
    setIsDetailModalOpen(true);
  };

  const displayedEmployees = data?.data || [];
  const totalPages = data?.meta.totalPages || 1;
  const totalItems = data?.meta.total || 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      {/* Header section with Greeting */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary flex items-center gap-2 flex-wrap">
            Chào buổi sáng, {user?.name || "Admin"}
            <span className="text-2xl origin-bottom-right rotate-12 animate-wave inline-block shrink-0">
              👋
            </span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Dưới đây là danh sách nhân viên hiện tại của công ty.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto mt-4 lg:mt-0 shrink-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm nhân viên..."
              className="w-full pl-8 bg-background"
            />
          </div>

          <CreateEmployeeModal onSuccess={() => setCurrentPage(1)} />
        </div>
      </div>

      <EmployeeDetailModal
        employeeId={selectedEmployeeId}
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />

      {/* Table Section */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col overflow-hidden h-[calc(100vh-160px)] min-h-125">
        {/* Table Wrapper for fixed height and scrolling */}
        <div className="flex-1 overflow-auto relative">
          <table className="w-full caption-bottom text-sm min-w-275 border-collapse">
            <TableHeader className="bg-muted/95 backdrop-blur sticky top-0 z-20 shadow-sm">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-35">Mã nhân viên</TableHead>
                <TableHead className="w-50">Họ và tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Người tạo</TableHead>
                <TableHead className="text-right sticky right-0 bg-muted/95 backdrop-blur z-30 w-30 shadow-sm before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
                  Hành động
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : displayedEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    Không tìm thấy nhân viên nào.
                  </TableCell>
                </TableRow>
              ) : (
                displayedEmployees.map((employee: any) => (
                  <TableRow
                    key={employee.id}
                    className="group hover:bg-muted transition-colors"
                  >
                    <TableCell className="font-medium text-muted-foreground uppercase text-xs">
                      {employee.id.split("-")[0]}
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
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                        {user?.name || "Admin"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right sticky right-0 bg-background group-hover:bg-muted transition-colors z-10 w-30 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                          title="Xem chi tiết"
                          onClick={() => handleViewStatus(employee.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                          title="Cập nhật"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </table>
        </div>

        {/* Pagination Section */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
