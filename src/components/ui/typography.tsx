import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "typo-h1",
      h2: "typo-h2",
      h3: "typo-h3",
      "label-lg": "typo-label-lg",
      "label-md": "typo-label-md",
      "label-caps": "typo-label-caps",
      "body-lg": "typo-body-lg",
      "body-md": "typo-body-md",
      "body-sm": "typo-body-sm",
      caption: "typo-caption",
      helper: "typo-helper",
    },
  },
  defaultVariants: {
    variant: "body-md",
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label"
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, asChild = false, as, ...props }, ref) => {
    // Priority: asChild > as > default for variant
    const Comp = asChild ? Slot : (as || getDefaultElement(variant));

    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"


function getDefaultElement(variant: TypographyProps["variant"]): any {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "label-lg":
    case "label-md":
    case "label-caps":
      return "label"
    case "helper":
    case "caption":
      return "span"
    default:
      return "p"
  }
}

export { Typography, typographyVariants }
