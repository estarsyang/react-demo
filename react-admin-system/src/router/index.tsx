import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import Home from "@/views/Home";
const About = lazy(() => import("@/views/About"));
const withLoadingComponent = (comp: any) => (
  <Suspense fallback={<div>loading...</div>}>{comp}</Suspense>
);

const routes = [
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/home", element: <Home /> },
  {
    path: "/about",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <About />
      </Suspense>
    ),
  },
];

export default routes;
