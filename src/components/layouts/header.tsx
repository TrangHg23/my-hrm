"use client";

import React from "react";
import { useAuthStore } from "@/features/auth/stores/auth";
import { UserRole } from "@/enums/user";
import { GreetingHeader } from "./greeting-header";
import { AttendanceCard } from "@/features/attendance/components/attendance-card";

interface HeaderProps {
  subtitle?: React.ReactNode;
}

export function Header({ subtitle }: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  const isEmployee = user?.role === UserRole.EMPLOYEE;

  return (
    <div className="space-y-4">
      <GreetingHeader 
        name={user?.name} 
        fallbackName={isEmployee ? "Nhân viên" : "Admin"} 
        subtitle={subtitle}
      />

      {isEmployee && <AttendanceCard />}
    </div>
  );
}
