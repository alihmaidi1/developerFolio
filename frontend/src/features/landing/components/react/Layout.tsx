import type { ReactNode } from "react";

export function Layout({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["layout", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
