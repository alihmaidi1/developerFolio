import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@/shared/ui";
import { RouteErrorBoundary } from "./RouteErrorBoundary";

const AdminRouter = lazy(() => import("./AdminRouter"));
const LandingPage = lazy(() => import("@/features/landing"));

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
            <RouteErrorBoundary>
              <LandingPage />
            </RouteErrorBoundary>
          }
        />
      </Routes>
    </Suspense>
  );
}
