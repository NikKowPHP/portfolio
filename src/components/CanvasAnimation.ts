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
