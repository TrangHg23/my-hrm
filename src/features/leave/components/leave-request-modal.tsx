"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LeaveRequestForm from "./leave-request-form";

interface LeaveRequestModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function LeaveRequestModal({
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: LeaveRequestModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen : setInternalOpen;

  const handleOpenChange = (val: boolean) => {
    setOpen?.(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-125 p-0 overflow-hidden border-none bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Tạo đơn xin nghỉ</DialogTitle>
        </DialogHeader>
        <LeaveRequestForm
          onSuccess={() => handleOpenChange(false)}
          onClose={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
