import React, { Suspense } from "react";
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";

import { Overview } from "./Overview.tsx";
import { Admin } from "./Admin.tsx";
import { Register } from "./Register.tsx";
import { Login } from "./Login.tsx";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const rootRoute = new RootRoute({
  component: () => (
    <Suspense>
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
  ),
});

const router = new Router({
  routeTree: rootRoute.addChildren([
    new Route({
      getParentRoute: () => rootRoute,
      path: "/",
      component: Overview,
    }),
    new Route({
      getParentRoute: () => rootRoute,
      path: "/admin",
      component: Admin,
    }),
    new Route({
      getParentRoute: () => rootRoute,
      path: "/login",
      component: Login,
    }),
    new Route({
      getParentRoute: () => rootRoute,
      path: "/register",
      component: Register,
    }),
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter = () => <RouterProvider router={router} />;
