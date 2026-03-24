"use client";

import * as React from "react";
import { format, isSameDay, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Typography } from "@/components/ui/typography";


export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface SingleDatePickerProps {
  label?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  className?: string;
}

export function SingleDatePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Chọn ngày",
  className,
}: SingleDatePickerProps) {
  const effectiveMin = React.useMemo(
    () => startOfDay(minDate ?? new Date()),
    [minDate]
  );

  const isDisabled = React.useCallback(
    (date: Date) => {
      if (date < effectiveMin) return true;
      if (maxDate && date > startOfDay(maxDate)) return true;
      return false;
    },
    [effectiveMin, maxDate]
  );

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Typography variant="label-md" asChild>
          <Label>{label}</Label>
        </Typography>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-input",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={isDisabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}


interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  minDate?: Date;
  fromLabel?: string;
  toLabel?: string;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  minDate,
  fromLabel = "Từ ngày",
  toLabel = "Đến ngày",
  className,
}: DateRangePickerProps) {
  const { from, to } = value;

  const handleFromChange = (date: Date | undefined) => {
    if (!date) {
      onChange({ from: undefined, to });
      return;
    }
    // Nếu ngày mới > toDate → reset toDate về cùng ngày đó
    const newTo = to && date > to ? date : to;
    onChange({ from: date, to: newTo });
  };

  const handleToChange = (date: Date | undefined) => {
    onChange({ from, to: date });
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <SingleDatePicker
        label={fromLabel}
        value={from}
        onChange={handleFromChange}
        minDate={minDate}
      />

      <SingleDatePicker
        label={toLabel}
        value={to}
        onChange={handleToChange}
        minDate={from ?? minDate}
      />
    </div>
  );
}


export function useDateRange(initial?: Partial<DateRange>) {
  const today = startOfDay(new Date());
  const [range, setRange] = React.useState<DateRange>({
    from: initial?.from ?? today,
    to: initial?.to ?? today,
  });

  const isMultipleDays = React.useMemo(() => {
    if (!range.from || !range.to) return false;
    return !isSameDay(range.from, range.to);
  }, [range]);

  return { range, setRange, isMultipleDays };
}