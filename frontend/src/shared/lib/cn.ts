import { clsx, type ClassValue } from "clsx";

/**
 * Conditional className helper. The app uses CSS Modules everywhere,
 * so clsx alone is enough — no need for tailwind-merge.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
