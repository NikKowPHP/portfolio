import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import App from "../App";
import Project from "./pages/Project";

const router = createBrowserRouter([
  {
    path: "/portfolio",
    element: <App />,
    children: [
      {
        path: "/portfolio",
        element: <Navigate to="/portfolio/welcome" />,
      },
      {
        path: "/portfolio",
        element: <Welcome />,
      },
      {
        path: "/portfolio/welcome",
        element: <Welcome />,
      },
      {
        path: "/portfolio/about",
        element: <About />,
      },
      {
        path: "/portfolio/contact",
        element: <Contact />,
      },
      {
        path: "/portfolio/projects",
        element: <Projects />,
      },
      {
        path: "/portfolio/projects/:project",
        element: <Project />,
      },
      {
        path: "/portfolio/*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
