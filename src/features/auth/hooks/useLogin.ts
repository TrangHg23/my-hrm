import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/login";
import { useAuthStore } from "../stores/auth";
import { LoginFormValues } from "@/features/auth/schema/auth";
import { useRouter } from "next/navigation";
import { UserRole } from "@/enums/user";

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: LoginFormValues) =>
      loginApi(email, password),

    onSuccess: (data) => {
      login(data.user, data.accessToken);

      const role = data.user.role;

      if (role === UserRole.ADMIN) {
        router.replace("/admin");
      } else {
        router.replace("/employee");
      }
    },
  });
};
