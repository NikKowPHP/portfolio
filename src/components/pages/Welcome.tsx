import React, { useEffect, useState } from "react";
import "./../../styles/welcome.css";
import Header from "../parts/Header";
import { initializeCanvas } from "../canvas/CanvasAnimation";
import { useRedirectContext } from "../contexts/RedirectContext";

const Welcome: React.FC = () => {
  const [heroHeaders, setHeroHeaders] = useState<HTMLElement[]>([]);
  const { isRedirecting } = useRedirectContext();

  useEffect(() => {
    if (isRedirecting && heroHeaders) animateHeadersReverse();
  }, [isRedirecting, heroHeaders]);

  function animateHeadersReverse() {

    heroHeaders.forEach((header, idx) => {
      setTimeout(() => {
        header.style.transform = "translateY(100%)";
      }, idx * 300);
    });
  }
  // Function to animate headers
  function animateHeaders() {
    let panelHeaders = document.querySelectorAll(".panel h1");
    let panelHeadersArray: HTMLElement[] =
      Array.prototype.slice.call(panelHeaders);
    const heroHeaders = document.querySelectorAll(".hero__header");
    let heroHeadersArray: HTMLElement[] =
      Array.prototype.slice.call(heroHeaders);

    setHeroHeaders(heroHeadersArray);

    // Animate hero headers
    heroHeadersArray.forEach((header, idx) => {
      setTimeout(() => {
        header.style.transform = "translateY(0)";
      }, 2000 + idx * 300);
    });

    // Animate panel headers
    setTimeout(() => {
      panelHeadersArray.forEach((header, idx) => {
        for (let i = 0; i < 10; i++) {
          let clone = header.cloneNode(true);
          header.parentElement?.appendChild(clone);
        }
        setTimeout(() => {
          header.parentElement?.classList.add("active");
        }, 1000 + idx * 100);
      });
    }, 1000);
  }

  useEffect(() => {
    const canvas: HTMLCanvasElement = document.querySelector("#headerCanvas")!;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    initializeCanvas(canvas, ctx);
    animateHeaders();
  }, []);

  return (
    <>
      <Header />
      <canvas id="headerCanvas"></canvas>
    </>
  );
};

export default Welcome;
