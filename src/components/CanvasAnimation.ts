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
function setDimensions(canvas: HTMLCanvasElement):Coordinates[] {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const circleArray: Coordinates[] = [];
  for (let i = 0; i < 100; i++) {
    let x = 0;
    let y = 0;
    while (x < canvas.width * 0.2 || x > canvas.width * 0.8) {
      x = Math.random() * canvas.width;
    }
    while (x < canvas.height * 0.2 || y > canvas.height * 0.8) {
      y = Math.random() * canvas.height;
    }
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    circleArray.push({ x, y });
  }
  return circleArray;
}
function setupMouseTracking(canvas: HTMLCanvasElement): MouseCoords {
  let mouseCoords: MouseCoords = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  };
  window.addEventListener("mousemove", (e) => {
    mouseCoords.targetX = e.clientX - canvas.width / 2;
    mouseCoords.targetY = e.clientY - canvas.width / 2;
  });
	return mouseCoords;
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
  window.addEventListener("resize", () => setDimensions(canvas));
};
