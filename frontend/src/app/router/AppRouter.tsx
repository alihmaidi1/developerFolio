import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@/shared/ui";
import { RouteErrorBoundary } from "./RouteErrorBoundary";
import {
  I18nProvider,
  PortfolioDataProvider,
  RootLayout,
} from "@/features/landing";

const AdminRouter = lazy(() => import("./AdminRouter"));

export function AppRouter() {
  return (
    <Suspense fallback={<Loading label="Loading page" />}>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <RouteErrorBoundary>
              <AdminRouter />
            </RouteErrorBoundary>
          }
        />
        <Route
          path="/*"
          element={
            <I18nProvider>
              <PortfolioDataProvider>
                <RootLayout />
              </PortfolioDataProvider>
            </I18nProvider>
          }
        />
      </Routes>
    </Suspense>
  );
}
