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

const MAX_CIRCLES = 200;
const MOVEMENT_THRESHOLD = 0.075;
const CIRCLE_RADIOUS = 2;
const MOUSE_MOVE_LISTENER_THROTTLE = 200; // ms

// Function to create random coordinates within canvas bounds
function generateRandomCoordinates(canvas: HTMLCanvasElement): Coordinates {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
}
function animateHeaders() {
  let panelHeaders = document.querySelectorAll(".panel h1");
  let panelHeadersArray: HTMLElement[] =
    Array.prototype.slice.call(panelHeaders);
  const heroHeaders = document.querySelectorAll(".hero__header");
  let heroHeadersArray: HTMLElement[] = Array.prototype.slice.call(heroHeaders);

  heroHeadersArray.forEach((header, idx) => {
    setTimeout(() => {
      header.style.transform = "translateY(0)";
    }, 2000 + idx * 300);
  });
  setTimeout(() => {
    panelHeadersArray.forEach((header, idx) => {
      for(let i = 0; i < 10; i++){
        let clone = header.cloneNode(true);
        header.parentElement?.appendChild(clone);
      }
      setTimeout(() => {
        console.log(header.parentElement)

        header.parentElement?.classList.add('active');
      },1000 + idx * 100)
    })
  }, 1000)
}
// Function to generate an array of coordinates within canvas bounds
function generateCircleArray(canvas: HTMLCanvasElement): Coordinates[] {
  const circleArray: Coordinates[] = [];
  for (let i = 0; i < MAX_CIRCLES; i++) {
    let x = 0;
    let y = 0;
    while (
      (x < canvas.width * 0.2 || x > canvas.width * 0.8) &&
      (y < canvas.height * 0.2 || y > canvas.height * 0.8)
    ) {
      const randomCoordinates = generateRandomCoordinates(canvas);
      x = randomCoordinates.x;
      y = randomCoordinates.y;
    }
    circleArray.push({ x, y });
  }
  return circleArray;
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}
function setDimensions(
  canvas: HTMLCanvasElement,
  circleArray: Coordinates[]
): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
  window.addEventListener("resize", () => setDimensions(canvas, circleArray));
}

function animate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  circleArray: Coordinates[],
  mouseCoords: MouseCoords
) {
  let frame = 0;
  let iteration = 0;
  function animateFrame() {
    ctx.fillStyle = "#dcfe4a";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mouseCoords.x = lerp(mouseCoords.x, mouseCoords.targetX, 0.075);
    mouseCoords.y = lerp(mouseCoords.y, mouseCoords.targetY, 0.075);
    ctx.beginPath();
    for (let i = 0; i < iteration; i++) {
      let { x, y } = circleArray[i];
      ctx.beginPath();
      ctx.arc(x + mouseCoords.x, y + mouseCoords.y, 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.lineTo(x + mouseCoords.x, y + mouseCoords.y);
      ctx.strokeStyle = "rgba(171,171,171, 0.118";
      ctx.stroke();
    }
    ctx.closePath();
    frame++;
    if (frame % 10 == 1 && iteration < circleArray.length) iteration++;
    requestAnimationFrame(animateFrame);
  }

  animateFrame();
}
export const animateCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => {
  let circleArray: Coordinates[] = [];

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

  animate(ctx, canvas, circleArray, mouseCoords);

  setDimensions(canvas, circleArray);

  animateHeaders();
};
