import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome /> ,
  },
  {
    path: "/about",
    element: <About/> ,
  },
  {
    path: "/contact",
    element: <Contact/> ,
  },
  {
    path: "/projects",
    element: <Projects/> ,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
