interface Coordinates {
  x: number;
  y: number;
}
interface MouseCoords {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}
export const animateCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  let circleArray: Coordinates[] = [];
  let panelHeaders = document.querySelectorAll(".panel h1");
  let panelHeadersArray: HTMLElement[] =
    Array.prototype.slice.call(panelHeaders);
  const heroHeaders = document.querySelectorAll(".hero__header");
  let heroHeadersArray: HTMLElement[] = Array.prototype.slice.call(heroHeaders);
 
}