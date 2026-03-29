"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormValues, loginSchema } from "@/features/auth/schema/auth";
import { useLogin } from "../hooks/use-login";
import { Typography } from "@/components/ui/typography";

export function LoginForm() {
  const { mutate, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    mutate(data);
  };

  const isLoading = isPending || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1 gap-0">
              <FormLabel className="typo-label-md ml-1 text-foreground/80">
                Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="hrm@gmail.com"
                    className={`pl-10 h-11 transition-all ${
                      form.formState.errors.email ? "border-destructive" : ""
                    }`}
                    {...field}
                  />
                </div>
              </FormControl>

              <div className="h-5 ml-1">
                <FormMessage className="typo-caption" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1 gap-0">
              <FormLabel className="typo-label-md ml-1 text-foreground/80">
                Mật khẩu
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="123456"
                    className={`pl-10 h-11 transition-all ${
                      form.formState.errors.password ? "border-destructive" : ""
                    }`}
                    {...field}
                  />
                </div>
              </FormControl>
              <div className="h-5 ml-1">
                <FormMessage className="typo-caption" />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 font-bold bg-primary hover:bg-primary/90 shadow-md transition-all active:scale-[0.98] relative overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <Typography as="span" variant="body-sm" className="font-bold">Đang xử lý...</Typography>
            </div>
          ) : (
            "Đăng nhập hệ thống"
          )}
        </Button>
      </form>
    </Form>
  );
}
