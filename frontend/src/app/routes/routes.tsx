import type { RouteObject } from "react-router-dom";

const routeModules = import.meta.glob("../../pages/**/route.tsx", {
  eager: true,
  import: "route",
}) as Record<string, RouteObject>;

export const routes: RouteObject[] = Object.values(routeModules);
