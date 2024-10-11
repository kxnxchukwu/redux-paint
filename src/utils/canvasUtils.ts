import { Point } from "./types";

export const clearCanvas = (canvas: HTMLCanvasElement): void => {
  const context = canvas.getContext("2d");

  if (!context) {
    return;
  }

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

interface SetCanvasSizeOptions {
  canvas: HTMLCanvasElement;
  height: number;
  width: number;
}

export const setCanvasSize = ({
  canvas,
  height,
  width,
}: SetCanvasSizeOptions): void => {
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.getContext("2d")?.scale(2, 2);
};

interface DrawStrokeOptions {
  context: CanvasRenderingContext2D;
  points: Point[];
  colour: string;
}

export const drawStroke = ({ context, points, colour }: DrawStrokeOptions) => {
  if (!points.length) {
    return;
  }

  context.strokeStyle = colour;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  points.forEach((point) => {
    context.lineTo(point.x, point.y);
    context.stroke();
  });
  context.closePath();
};
