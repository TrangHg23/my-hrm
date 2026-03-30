import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../api/logout";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return useMutation({
    mutationFn: () => logoutApi(),
    onSettled: () => {
      logout();
      useAuthStore.persist.clearStorage(); 
      router.replace("/");
    },
  });
};
