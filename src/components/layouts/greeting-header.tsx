import React from "react";
import { useGreeting } from "@/hooks/use-greeting";
import { Typography } from "@/components/ui/typography";

interface GreetingHeaderProps {
  name?: string | null;
  fallbackName?: string;
  subtitle?: React.ReactNode;
}

export function GreetingHeader({ name, fallbackName = "bạn", subtitle }: GreetingHeaderProps) {
  const greeting = useGreeting();

  return (
    <div className="flex-1 min-w-0">
      <Typography as="h1" variant="h2" className="md:text-3xl text-primary flex items-center gap-2 flex-wrap">
        {greeting}, {name || fallbackName}
        <span className="text-2xl origin-bottom-right rotate-12 animate-wave inline-block shrink-0">
          👋
        </span>
      </Typography>

      {subtitle && (
        <Typography as="p" variant="body-sm" className="text-muted-foreground mt-1 md:text-base">
          {subtitle}
        </Typography>
      )}
    </div>
  );
}
