import React from "react";
import { useGreeting } from "@/hooks/use-greeting";

interface GreetingHeaderProps {
  name?: string | null;
  fallbackName?: string;
  subtitle?: React.ReactNode;
}

export function GreetingHeader({ name, fallbackName = "bạn", subtitle }: GreetingHeaderProps) {
  const greeting = useGreeting();

  return (
    <div className="flex-1 min-w-0">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary flex items-center gap-2 flex-wrap">
        {greeting}, {name || fallbackName}
        <span className="text-2xl origin-bottom-right rotate-12 animate-wave inline-block shrink-0">
          👋
        </span>
      </h1>

      {subtitle && (
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
