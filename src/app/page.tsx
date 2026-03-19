import { LoginForm } from "@/features/auth/components/login-form";
import { LoginGuard } from "@/features/auth/components/login-guard";

export default function LoginPage() {
  return (
    <LoginGuard>
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-xl overflow-hidden">
          <div className="h-2 bg-(--gradient-primary) w-full" />

          <div className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground tracking-tight italic">
                HRM Portal
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
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
