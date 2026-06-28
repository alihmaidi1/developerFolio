import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Loading from "@/shared/ui/loading/Loading";
import { RouteErrorBoundary } from "./RouteErrorBoundary";

const AdminRouter = lazy(() => import("./AdminRouter"));

export function AppRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <RouteErrorBoundary>
              <AdminRouter />
            </RouteErrorBoundary>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Suspense>
  );
}
