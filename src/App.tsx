import React from "react";
import "./styles/app.css";
import Nav from "./components/parts/Nav";
import { Outlet } from "react-router-dom";
import { RedirectContextProvider } from "./components/contexts/RedirectContext";

const App: React.FC = () => {
  return (
    <RedirectContextProvider>
      <Nav />
      <Outlet />
    </RedirectContextProvider>
  );
};

export default App;
