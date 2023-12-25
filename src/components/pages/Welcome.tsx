import React, { useEffect, useState } from "react";
import "./../../styles/welcome.css";
import Header from "../parts/Header";
import { initializeCanvas } from "../canvas/CanvasAnimation";
import { useRedirectContext } from "../contexts/RedirectContext";
import { useLinkAnimation } from "../hooks/useLinkAnimation";
import Footer from "../parts/Footer";

const Welcome: React.FC = () => {
  const { isRedirecting } = useRedirectContext();
  const {animateLinksReverse} = useLinkAnimation([".hero__header"], 1000, 300);

  useEffect(() => {
    if (isRedirecting) animateLinksReverse();
  }, [isRedirecting ]);


  useEffect(() => {
    const canvas: HTMLCanvasElement = document.querySelector("#headerCanvas")!;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    initializeCanvas(canvas, ctx);
  }, []);

  return (
    <>
      <Header />
      <canvas id="headerCanvas"></canvas>
      <Footer classes="absolute" />
    </>
  );
};

export default Welcome;
