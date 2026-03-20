import { LoginForm } from "@/features/auth/components/login-form";
import { LoginGuard } from "@/features/auth/components/login-guard";
import Image from "next/image";

export default function LoginPage() {
  return (
    <LoginGuard>
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-xl overflow-hidden">
          <div className="h-2 bg-(--gradient-primary) w-full" />

          <div className="p-8">
            <div className="mb-8 text-center flex flex-col items-center">
              <div className="flex items-center gap-3 justify-center mb-2">
                <div className="size-10 shrink-0">
                  <Image src="/logo.png" alt="HRM Portal Logo" width={40} height={40} className="object-contain" />
                </div>
                <h1 className="text-3xl font-bold text-primary tracking-tight italic">
                  HRM Portal
                </h1>
              </div>
              <p className="text-muted-foreground text-sm">
                Hệ thống quản trị nguồn nhân lực tập trung
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                © 2026 HRM System. Bảo mật & Tin cậy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LoginGuard>
  );
}
