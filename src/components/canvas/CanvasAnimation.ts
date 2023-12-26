const MAX_CIRCLES = 300;
const MOVEMENT_THRESHOLD = 0.075;
const CIRCLE_RADIOUS = 2;

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

// Function to create random coordinates within canvas bounds
function generateRandomCircle(canvas: HTMLCanvasElement): Coordinates {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
}

// Function to generate an array of coordinates within canvas bounds
function generateCircleArray(canvas: HTMLCanvasElement): Coordinates[] {
  const circleArray: Coordinates[] = [];
  while (circleArray.length < MAX_CIRCLES) {
    const randomCircle = generateRandomCircle(canvas);
    // Ensure generated circle coordinates are within canvas bounds
    if (
      randomCircle.x > canvas.width * 0.1 &&
      randomCircle.x < canvas.width * 0.9 &&
      randomCircle.y > canvas.height * 0.1 &&
      randomCircle.y < canvas.height * 0.9
    ) {
      circleArray.push(randomCircle);
    }
  }
  return circleArray;
}

// Function to handle canvas resize and adjust circle coordinates accordingly
function handleResize(
  canvas: HTMLCanvasElement,
  circleArray: Coordinates[]
): void {
  const oldWidth = canvas.width;
  const oldHeight = canvas.height;

  // Update canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Calculate width and height ratio changes
  const widthRatio = canvas.width / oldWidth;
  const heightRatio = canvas.height / oldHeight;

  // Update circle coordinates based on new canvas dimensions
  circleArray.forEach((circle) => {
    circle.x *= widthRatio;
    circle.y *= heightRatio;
  });
}

// Function to set canvas dimensions
function setDimensions(
  canvas: HTMLCanvasElement,
): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Function to animate the canvas
function animateCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  circleArray: Coordinates[],
  mouseCoords: MouseCoords
) {
  let frame = 0;
  let iteration = 0;

  // Animation frame function
  function animateFrame() {
    ctx.fillStyle = "#dcfe4a";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mouseCoords.x = lerp(
      mouseCoords.x,
      mouseCoords.targetX,
      MOVEMENT_THRESHOLD
    );
    mouseCoords.y = lerp(
      mouseCoords.y,
      mouseCoords.targetY,
      MOVEMENT_THRESHOLD
    );
    ctx.beginPath();
    for (let i = 0; i < iteration; i++) {
      let { x, y } = circleArray[i];
      ctx.beginPath();
      ctx.arc(
        x + mouseCoords.x,
        y + mouseCoords.y,
        CIRCLE_RADIOUS,
        0,
        2 * Math.PI
      );
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

  // Start the animation loop
  animateFrame();
}

//  Function for linear interpolation
function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

// Function to initialize the canvas
export function initializeCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): void {
  //  Generate an array of circle coordinates
  const circleArray: Coordinates[] = generateCircleArray(canvas);

  // Initialize mouse coordinates
  const mouseCoords: MouseCoords = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  };
  
  // Event listener for mouse movement to update target coordinates
  window.addEventListener("mousemove", (e) => {
    mouseCoords.targetX = e.clientX - canvas.width / 3;
    mouseCoords.targetY = e.clientY - canvas.width / 3;
  });

  // Event listener for canvas resize to handle resizing and circle adjustments
  window.addEventListener("resize", () => handleResize(canvas, circleArray));

   // Start canvas animation and set canvas dimensions
  animateCanvas(ctx, canvas, circleArray, mouseCoords);
  setDimensions(canvas);
}
