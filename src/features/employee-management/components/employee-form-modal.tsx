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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateEmployee } from "../hooks/use-create-employee";
import { useUpdateEmployee } from "../hooks/use-update-employee";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "../schema/employee";
import {
  CreateEmployeeFormValues,
  EmployeeFormValues,
  EmployeeStatus,
} from "../types/employees";

import { useEmployeeModalStore } from "../stores/employee-modal";

export function EmployeeFormModal({ onSuccess }: { onSuccess?: () => void }) {
  const {
    isFormOpen: isOpen,
    formMode: mode,
    selectedEmployee: employee,
    closeForm: onOpenChange,
  } = useEmployeeModalStore();

  const isUpdate = mode === "update";
  const schema = isUpdate ? updateEmployeeSchema : createEmployeeSchema;

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      status: EmployeeStatus.WORKING,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isUpdate && employee) {
        form.reset({
          name: employee.name,
          email: employee.email,
          phone: employee.phone || "",
          status: employee.status || EmployeeStatus.WORKING,
        });
      } else {
        form.reset({
          name: "",
          email: "",
          password: "",
          phone: "",
          status: EmployeeStatus.WORKING,
        });
      }
    }
  }, [isOpen, isUpdate, employee, form]);

  const handleClose = () => {
    onOpenChange();
    form.reset();
  };

  const { mutate: createMutation, isPending: isCreating } = useCreateEmployee(
    () => {
      handleClose();
      if (onSuccess) onSuccess();
    }
  );

  const { mutate: updateMutation, isPending: isUpdating } = useUpdateEmployee(
    () => {
      handleClose();
      if (onSuccess) onSuccess();
    }
  );

  const onSubmit = (values: EmployeeFormValues) => {
    if (isUpdate && employee) {
      const { password, email, ...payload } = values as any;
      const finalPayload = password ? { ...payload, password } : payload;

      updateMutation({ id: employee.id, data: finalPayload as any });
    } else {
      createMutation(values as CreateEmployeeFormValues);
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onOpenChange()}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-106.25"
      >
        <DialogHeader>
          <DialogTitle className="typo-h3 text-center">
            {isUpdate ? "Cập nhật nhân viên" : "Tạo tài khoản nhân viên"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isUpdate
              ? "Thay đổi thông tin hồ sơ của nhân viên."
              : "Tài khoản này sẽ được dùng để nhân viên đăng nhập vào hệ thống."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit as any)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="typo-label-md ml-1 text-foreground/80">
                    Họ và tên <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} />
                  </FormControl>
                  <FormMessage className="typo-caption ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="typo-label-md ml-1 text-foreground/80">
                    Email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="nhanvien@company.com"
                      disabled={isUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="typo-caption ml-1" />
                </FormItem>
              )}
            />

            {!isUpdate && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="typo-label-md ml-1 text-foreground/80">
                      Mật khẩu <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Tối thiểu 6 ký tự"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="typo-caption ml-1" />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="typo-label-md ml-1 text-foreground/80">
                    Số điện thoại
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="vd: 0987654321"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="typo-caption ml-1" />
                </FormItem>
              )}
            />

            {isUpdate && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="typo-label-md ml-1 text-foreground/80">
                      Trạng thái nhân viên
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EmployeeStatus.PROBATION}>
                          Thử việc
                        </SelectItem>
                        <SelectItem value={EmployeeStatus.WORKING}>
                          Đang làm việc
                        </SelectItem>
                        <SelectItem value={EmployeeStatus.RESIGNED}>
                          Đã nghỉ việc
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="typo-caption ml-1" />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="pt-2">
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
