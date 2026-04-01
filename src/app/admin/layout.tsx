"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserRole } from "@/enums/user";
import { AdminSidebar } from "@/components/layouts/admin-sidebar";
import { Header } from "@/components/layouts/header";
import { useAuthStore } from "@/features/auth/stores/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
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

    if (user.role !== UserRole.ADMIN) {
      router.replace("/employee/attendance");
    }
  }, [user, hasHydrated, router]);

  if (!hasHydrated) return null;
  if (!user || user.role !== UserRole.ADMIN) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex w-full h-16 items-center justify-between border-b px-4 md:hidden">
            <div className="flex items-center gap-2">
              <div className="size-8 flex items-center justify-center shrink-0">
                <Image src="/logo.png" alt="HRM Portal Logo" width={32} height={32} className="object-contain" />
              </div>
              <span className="font-bold text-lg text-primary">
                HRM Portal
              </span>
            </div>
            <SidebarTrigger />
          </div>
          <div className="px-4 pb-4 space-y-4 max-w-7xl mx-auto w-full">
            <Header />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
