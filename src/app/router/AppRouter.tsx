import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "@/shared/ui/loading/Loading";
import { RouteErrorBoundary } from "./RouteErrorBoundary";

const LandingPage = lazy(() =>
  import("@/features/landing").then((module) => ({
    default: module.LandingPage,
  })),
);
const AdminRouter = lazy(() => import("./AdminRouter"));

export function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <RouteErrorBoundary>
              <LandingPage />
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
