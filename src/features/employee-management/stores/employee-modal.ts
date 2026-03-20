import { create } from "zustand";
import { Employee } from "../types/employees";

interface EmployeeModalState {
  // Form Modal
  formMode: "create" | "update";
  isFormOpen: boolean;
  selectedEmployee: Employee | null;

  // Detail Modal
  isDetailOpen: boolean;
  selectedEmployeeId: string | null;

  // Form Actions
  openCreateForm: () => void;
  openUpdateForm: (employee: Employee) => void;
  closeForm: () => void;

  // Detail Actions
  openDetail: (id: string) => void;
  closeDetail: () => void;
}

export const useEmployeeModalStore = create<EmployeeModalState>((set) => ({
  // Initial State
  formMode: "create",
  isFormOpen: false,
  selectedEmployee: null,

  isDetailOpen: false,
  selectedEmployeeId: null,

  // Actions
  openCreateForm: () =>
    set({
      isFormOpen: true,
      formMode: "create",
      selectedEmployee: null,
    }),

  openUpdateForm: (employee: Employee) =>
    set({
      isFormOpen: true,
      formMode: "update",
      selectedEmployee: employee,
    }),

  closeForm: () =>
    set({
      isFormOpen: false,
      selectedEmployee: null,
    }),

  openDetail: (id: string) =>
    set({
      isDetailOpen: true,
      selectedEmployeeId: id,
    }),

  closeDetail: () =>
    set({
      isDetailOpen: false,
      selectedEmployeeId: null,
    }),
}));
