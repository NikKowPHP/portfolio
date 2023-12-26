import React from "react";
import "./styles/app.css";
import Nav from "./components/parts/Nav";
import { Outlet } from "react-router-dom";
import { RedirectContextProvider } from "./components/contexts/RedirectContext";
import Footer from "./components/parts/Footer";

const App: React.FC = () => {
  return (
    <RedirectContextProvider>
      <Nav />
      <Outlet />
      {/* <Footer classes="fixed" /> */}
    </RedirectContextProvider>
  );
};

export default App;
