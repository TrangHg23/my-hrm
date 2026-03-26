import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      typo: [
        { typo: ["h1", "h2", "h3", "label-lg", "label-md", "label-caps", "body-lg", "body-md", "body-sm", "caption", "helper"] }
      ]
    }
  }
} as any)

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
