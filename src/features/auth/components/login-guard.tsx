"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/stores/auth";
import { UserRole } from "@/enums/user";

export const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    if (user.role === UserRole.ADMIN) {
      router.replace("/admin");
    } else {
      router.replace("/employee");
    }
  }, [user]);

  if (user) return null;

  return <>{children}</>;
};
