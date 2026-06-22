import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "@/shared/ui/loading/Loading";
import { RouteErrorBoundary } from "./RouteErrorBoundary";

const PortfolioPage = lazy(() => import("@/app/PortfolioPage"));
const AdminRouter = lazy(() => import("./AdminRouter"));

export function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <RouteErrorBoundary>
              <PortfolioPage />
            </RouteErrorBoundary>
          }
        />
        <Route
          path="/admin/*"
          element={
            <RouteErrorBoundary>
              <AdminRouter />
            </RouteErrorBoundary>
          }
        />
      </Routes>
    </Suspense>
  );
}
