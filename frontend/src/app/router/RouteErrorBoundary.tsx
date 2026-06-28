import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ErrorBoundary, ErrorState } from "@/shared/ui";

interface RouteErrorBoundaryProps {
  children: ReactNode;
}

export function RouteErrorBoundary({ children }: RouteErrorBoundaryProps) {
  const location = useLocation();

  return (
    <ErrorBoundary
      key={location.pathname}
      fallback={({ reset }) => (
        <ErrorState
          title="This page could not be displayed."
          description="Retry the page or return to the portfolio while the issue is investigated."
          actionLabel="Retry page"
          onAction={reset}
          href="/"
          hrefLabel="Return to portfolio"
          fullPage
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
