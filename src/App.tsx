import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { animateCanvas } from "./components/CanvasAnimation";

const App: React.FC = () => {
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.querySelector("#headerCanvas")!;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    animateCanvas(canvas, ctx);
  }, []);

  return (
    <>
      <Header />
      <canvas id="headerCanvas"></canvas>
    </>
  );
};

export default App;
