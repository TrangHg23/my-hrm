"use client";

import React from "react";
import { AttendanceCard } from "@/features/attendance/components/attendance-card";

interface HeaderProps {
  subtitle?: React.ReactNode;
}

export function Header({ subtitle }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-background pt-4 -mx-4 px-4">
      <div className="space-y-4">
        <AttendanceCard subtitle={subtitle} />
      </div>
    </div>
  );
}
