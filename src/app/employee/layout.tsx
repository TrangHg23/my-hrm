"use client";

import { UserRole } from "@/enums/user";
import { useAuthStore } from "@/features/auth/stores/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user) {
      router.replace("/");
      return;
    }

    if (user.role !== UserRole.EMPLOYEE) {
      router.replace("/admin");
    }
  }, [user, hasHydrated, router]);

  if (!hasHydrated) return null;
  if (!user || user.role !== UserRole.EMPLOYEE) return null;

  return <>{children}</>;
}
