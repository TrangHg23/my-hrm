"use client";

import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetEmployees } from "../hooks/use-get-employees";
import { useEmployeeModalStore } from "../stores/employee-modal";
import { EmployeeFormModal } from "./employee-form-modal";
import { EmployeeDetailModal } from "./employee-detail-modal";
import { EmployeeManagementTable } from "./employee-management-table";

export function EmployeeManagementDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const itemsPerPage = 10;
  
  const { openCreateForm, formMode } = useEmployeeModalStore();

  const { data, isLoading } = useGetEmployees({
    page: currentPage,
    limit: itemsPerPage,
    q: debouncedSearchQuery,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const employees = data?.data || [];
  const totalPages = data?.meta.totalPages || 1;
  const totalItems = data?.meta.total || 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm nhân viên..."
            className="w-full pl-8 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button className="w-full md:w-auto shrink-0 gap-1" onClick={openCreateForm}>
          <Plus className="h-4 w-4" />
          Thêm nhân viên
        </Button>
      </div>

      <EmployeeDetailModal />

      <EmployeeFormModal
        onSuccess={() => {
          if (formMode === "create") {
            setCurrentPage(1);
          }
        }}
      />

      <EmployeeManagementTable
        data={employees}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
