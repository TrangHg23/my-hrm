import z from "zod";
import { EmployeeStatus } from "../types/employees";

export const createEmployeeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Vui lòng điền họ và tên" })
    .max(100, { message: "Họ và tên tối đa 100 ký tự" }),
  email: z
    .string()
    .min(1, { message: "Vui lòng điền email" })
    .email({ message: "Email không đúng định dạng" })
    .max(255, { message: "Email tối đa 255 ký tự" }),
  password: z
    .string()
    .min(1, { message: "Vui lòng điền mật khẩu" })
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, { message: "Vui lòng nhập số điện thoại hợp lệ" })
    .optional()
    .or(z.literal(""))
});

export const updateEmployeeSchema = createEmployeeSchema.omit({ email: true }).extend({
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .optional()
    .or(z.literal("")),
  status: z.enum([
    EmployeeStatus.PROBATION,
    EmployeeStatus.WORKING,
    EmployeeStatus.RESIGNED,
  ]),
  isActive: z.boolean().optional(),
});
