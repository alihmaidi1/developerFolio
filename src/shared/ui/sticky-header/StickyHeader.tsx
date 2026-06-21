import type { ReactNode } from "react";

interface StickyHeaderProps {
  children: ReactNode;
}

export default function StickyHeader({ children }: StickyHeaderProps) {
  return <>{children}</>;
}
