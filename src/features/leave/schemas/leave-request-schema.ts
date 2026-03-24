import { z } from "zod";

export const leaveRequestSchema = z
  .object({
    fromDate: z.string().min(1, "Vui lòng chọn ngày bắt đầu"),
    toDate: z.string().min(1, "Vui lòng chọn ngày kết thúc"),
    isFullDay: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    reason: z.string().min(1, "Vui lòng nhập lý do xin nghỉ"),
  })
  .refine(
    (data) => {
      if (!data.isFullDay) {
        if (!data.startTime || !data.endTime) return false;
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "Thời gian bắt đầu phải trước thời gian kết thúc",
      path: ["endTime"],
    }
  );

export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;
