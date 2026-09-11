import type { ReactNode } from "react";

type AppRoute = {
  path: string;
  element: ReactNode;
};

const routeModules = import.meta.glob("../../pages/**/route.tsx", {
  eager: true,
  import: "route",
}) as Record<string, AppRoute>;

export const routes = Object.values(routeModules);
