import React, { useEffect } from "react";
import "./../../styles/welcome.css";
import Header from "../parts/Header";
import { initializeCanvas} from "../canvas/CanvasAnimation";

const Welcome: React.FC = () => {
  useEffect(() => {
    const canvas: HTMLCanvasElement = document.querySelector("#headerCanvas")!;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    initializeCanvas(canvas, ctx);
  }, []);



  return (
    <>
      <Header />
      <canvas id="headerCanvas"></canvas>
    </>
  );
};

export default Welcome;