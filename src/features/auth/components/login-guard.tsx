"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/stores/auth";
import { UserRole } from "@/enums/user";

export const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    
    if (user) {
      if (user.role === UserRole.ADMIN) {
        router.replace("/admin");
      } else {
        router.replace("/employee");
      }
    }
  }, [user, hasHydrated, router]);
  
  if (!hasHydrated) return null;

  if (user) return null;

  return <>{children}</>;
};
