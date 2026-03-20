"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEmployee } from "../hooks/use-create-employee";
import { useUpdateEmployee } from "../hooks/use-update-employee";
import { 
  createEmployeeSchema, 
  updateEmployeeSchema, 
} from "../schema/employee";
import { Employee, CreateEmployeeFormValues, EmployeeFormValues } from "../types/employees";

import { useEmployeeModalStore } from "../stores/employee-modal";

export function EmployeeFormModal({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { 
    isFormOpen: isOpen, 
    formMode: mode, 
    selectedEmployee: employee, 
    closeForm: onOpenChange 
  } = useEmployeeModalStore();

  const isUpdate = mode === "update";
  const schema = isUpdate ? updateEmployeeSchema : createEmployeeSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isUpdate && employee) {
        reset({
          name: employee.name,
          email: employee.email,
          phone: employee.phone || "",
          password: "", 
        });
      } else {
        reset({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      }
    }
  }, [isOpen, isUpdate, employee, reset]);

  const handleClose = () => {
    onOpenChange();
    reset();
  };

  const { mutate: createMutation, isPending: isCreating } = useCreateEmployee(() => {
    handleClose();
    if (onSuccess) onSuccess();
  });

  const { mutate: updateMutation, isPending: isUpdating } = useUpdateEmployee(() => {
    handleClose();
    if (onSuccess) onSuccess();
  });

  const onSubmit = (values: EmployeeFormValues) => {
    if (isUpdate && employee) {
      const payload: any = { ...values };
      if (!payload.password) delete payload.password;
      
      updateMutation({ id: employee.id, data: payload });
    } else {
      createMutation(values as CreateEmployeeFormValues);
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onOpenChange()}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isUpdate ? "Cập nhật nhân viên" : "Tạo tài khoản nhân viên"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isUpdate
              ? "Thay đổi thông tin hồ sơ của nhân viên."
              : "Tài khoản này sẽ được dùng để nhân viên đăng nhập vào hệ thống."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">
                Họ và tên <span className="text-destructive">*</span>
              </Label>
              <Input id="name" placeholder="Nguyễn Văn A" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nhanvien@company.com"
                {...register("email")}
                disabled={isUpdate} 
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            {!isUpdate && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">
                  Mật khẩu <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Tối thiểu 6 ký tự"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password.message}</p>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="vd: 0987654321"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang lưu...
                </>
              ) : isUpdate ? (
                "Lưu thay đổi"
              ) : (
                "Lưu tài khoản"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
