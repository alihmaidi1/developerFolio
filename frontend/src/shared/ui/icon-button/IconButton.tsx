import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./IconButton.module.css";

export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function IconButton({ className, type = "button", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(styles.button, className)}
      type={type}
      {...props}
    />
  );
});
