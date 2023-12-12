import React from "react";
import "./styles/app.css";
import Nav from "./components/parts/Nav";
import { Outlet } from "react-router-dom";



const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default App;
