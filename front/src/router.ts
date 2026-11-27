import { lazy } from "solid-js";
import { createRouter } from "@solidjs/router";

export const Router = createRouter({
  routes: [
    { path: "/", component: lazy(() => import("./pages/Home")) },
    { path: "/about", component: lazy(() => import("./pages/About")) },
  ],
});

export const { paths } = Router;
