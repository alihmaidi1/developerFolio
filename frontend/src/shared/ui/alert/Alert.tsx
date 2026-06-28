import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Alert.module.css";

interface AlertProps {
  children: ReactNode;
  className?: string;
  variant?: "error" | "info" | "success";
}

export function Alert({ children, className, variant = "info" }: AlertProps) {
  return (
    <div
      className={cn(styles.alert, styles[variant], className)}
      role={variant === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
