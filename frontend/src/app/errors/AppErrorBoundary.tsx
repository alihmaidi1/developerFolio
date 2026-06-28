import type { ReactNode } from "react";
import { ErrorBoundary, ErrorState } from "@/shared/ui";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={() => (
        <ErrorState
          title="The application stopped unexpectedly."
          description="Reload the page to start a clean session. If the problem continues, check the browser console and API availability."
          actionLabel="Reload application"
          onAction={() => window.location.reload()}
          fullPage
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
