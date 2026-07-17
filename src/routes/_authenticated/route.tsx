import { createFileRoute, Outlet } from "@tanstack/react-router";

// Auth temporarily disabled — routes under _authenticated are publicly accessible.
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: () => <Outlet />,
});
