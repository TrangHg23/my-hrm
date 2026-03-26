import { Send, Clock, Calendar, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DateRangePicker,
  useDateRange,
} from "@/components/ui/date-range-picker";
import { Typography } from "@/components/ui/typography";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  leaveRequestSchema,
  type LeaveRequestFormValues,
} from "../schemas/leave-request-schema";
import { getVNDateKey } from "@/utils/date";
import { addMinutes } from "@/features/leave/utils/leave";
import { useCreateLeaveRequest } from "../hooks/use-create-leave-request";

interface LeaveRequestFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function LeaveRequestForm({
  onSuccess,
  onClose,
}: LeaveRequestFormProps) {
  const { range, setRange, isMultipleDays } = useDateRange();
  const [timeMode, setTimeMode] = useState<string>("full-day");
  const { mutateAsync: createLeaveRequest, isPending } = useCreateLeaveRequest();

  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    mode: "onChange",
    defaultValues: {
      fromDate: range.from ? getVNDateKey(range.from) : "",
      toDate: range.to
        ? getVNDateKey(range.to)
        : range.from
          ? getVNDateKey(range.from)
          : "",
      isFullDay: true,
      startTime: "08:00",
      endTime: "17:00",
      reason: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (range.from) {
      setValue("fromDate", getVNDateKey(range.from));
      if (!range.to) {
        setValue("toDate", getVNDateKey(range.from));
      }
    }
    if (range.to) {
      setValue("toDate", getVNDateKey(range.to));
    }
  }, [range.from, range.to, setValue]);

  useEffect(() => {
    if (isMultipleDays) {
      setTimeMode("full-day");
      setValue("isFullDay", true);
    } else {
      setValue("isFullDay", timeMode === "full-day");
    }
  }, [timeMode, isMultipleDays, setValue]);

  const onSubmit = async (values: LeaveRequestFormValues) => {
    try {
      await createLeaveRequest(values);
      onSuccess?.();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-6 bg-card border rounded-2xl shadow-xl max-w-lg mx-auto transition-all"
      >
        <Typography variant="h1" className="mb-8 text-center text-foreground">
          Tạo đơn xin nghỉ
        </Typography>

        <div className="space-y-7">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="size-4" />
              <Typography variant="label-lg" asChild>
                <Label>Thời gian nghỉ</Label>
              </Typography>
            </div>
            <DateRangePicker value={range} onChange={setRange} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="size-4" />
                <Typography variant="label-lg" asChild>
                  <Label>Hình thức nghỉ</Label>
                </Typography>
              </div>
            </div>

            <RadioGroup
              value={timeMode}
              onValueChange={setTimeMode}
              disabled={isMultipleDays}
              className="flex items-center gap-6 py-1"
            >
              <div className="flex items-center gap-2.5">
                <RadioGroupItem value="full-day" id="full-day" />
                <Typography variant="label-md" asChild>
                  <Label htmlFor="full-day" className="cursor-pointer">
                    Cả ngày
                  </Label>
                </Typography>
              </div>

              <div className="flex items-center gap-2.5">
                <RadioGroupItem value="specific" id="specific" />
                <Typography variant="label-md" asChild>
                  <Label
                    htmlFor="specific"
                    className={cn(
                      "cursor-pointer",
                      isMultipleDays && "text-muted-foreground opacity-50",
                    )}
                  >
                    Theo giờ
                  </Label>
                </Typography>
              </div>
            </RadioGroup>

            {timeMode === "specific" && !isMultipleDays && (
              <div className="space-y-2 animate-in zoom-in-95 fade-in duration-300">
                <div
                  className={cn(
                    "grid grid-cols-2 gap-2.5 p-3 bg-muted/30 rounded-xl border transition-colors",
                    errors.endTime
                      ? "border-destructive/50 bg-destructive/5"
                      : "border-border/50",
                  )}
                >
                  <div className="space-y-1.5">
                    <Typography
                      variant="label-caps"
                      className={cn(
                        "ml-0.5",
                        errors.endTime
                          ? "text-destructive/80"
                          : "text-muted-foreground/70",
                      )}
                    >
                      Bắt đầu
                    </Typography>
                    <div className="relative group">
                      <input
                        type="time"
                        {...register("startTime", {
                          onChange: (e) => {
                            const newStartTime = e.target.value;
                            const currentEndTime = form.getValues("endTime");
                            if (currentEndTime && currentEndTime <= newStartTime) {
                              form.setValue("endTime", addMinutes(newStartTime, 30));
                            }
                            form.trigger(["startTime", "endTime"]);
                          },
                        })}
                        className={cn(
                          "w-full h-9 bg-card border rounded-lg px-2.5 typo-body-md outline-none transition-all scheme-light dark:scheme-dark",
                          errors.endTime
                            ? "border-destructive/50 focus:ring-destructive/20 focus:border-destructive"
                            : "border-border focus:ring-primary/20 focus:border-primary",
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Typography
                      variant="label-caps"
                      className={cn(
                        "ml-0.5",
                        errors.endTime
                          ? "text-destructive/80"
                          : "text-muted-foreground/70",
                      )}
                    >
                      Kết thúc
                    </Typography>
                    <div className="relative group">
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <FormControl>
                              <input
                                type="time"
                                {...field}
                                min={form.watch("startTime")}
                                onChange={(e) => {
                                  field.onChange(e);
                                  form.trigger(["startTime", "endTime"]);
                                }}
                                className={cn(
                                  "w-full h-9 bg-card border rounded-lg px-2.5 typo-body-md outline-none transition-all scheme-light dark:scheme-dark",
                                  errors.endTime
                                    ? "border-destructive/50 focus:ring-destructive/20 focus:border-destructive"
                                    : "border-border focus:ring-primary/20 focus:border-primary",
                                )}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="endTime"
                  render={() => <FormMessage className="typo-helper ml-1" />}
                />
              </div>
            )}

            {isMultipleDays && (
              <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg border border-dashed border-border">
                <div className="size-1.5 rounded-full bg-primary/40 animate-pulse" />
                <Typography variant="helper" className="text-muted-foreground">
                  Hệ thống tự động chọn "Cả ngày" khi nghỉ nhiều ngày.
                </Typography>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <MessageSquareText className="size-4" />
              <Typography variant="label-lg" asChild>
                <Label>Lý do xin nghỉ</Label>
              </Typography>
            </div>
            <div className="space-y-1">
              <Textarea
                {...register("reason")}
                placeholder="Nhập lý do chi tiết để cấp trên dễ duyệt bạn nhé..."
                className={cn(
                  "min-h-28 resize-none border-border focus-visible:ring-primary/20 bg-muted/10 rounded-xl block w-full p-4 typo-body-sm transition-all focus:bg-card",
                  errors.reason &&
                    "border-destructive/50 focus-visible:ring-destructive/20",
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={() => <FormMessage className="typo-helper ml-1" />}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button
              variant="secondary"
              className="flex-1 h-12 rounded-xl typo-body-md font-bold text-muted-foreground hover:bg-muted transition-all"
              type="button"
              onClick={onClose}
            >
              Hủy bỏ
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl typo-body-md font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Đang gửi..." : "Gửi đơn"}{" "}
              {!isPending && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
