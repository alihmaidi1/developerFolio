import { lazy, Suspense, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, useLocation } from "react-router-dom";
import { store } from "@/app/store";
import { queryClient } from "@/shared/lib/query-client";

const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((module) => ({
    default: module.ReactQueryDevtools,
  })),
);

interface AppProvidersProps {
  children: ReactNode;
}

function DevelopmentTools() {
  const location = useLocation();

  if (!import.meta.env.DEV || location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
          <DevelopmentTools />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
