export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  points: Point[];
  colour: string;
}

export interface RootState {
  currentStroke: Stroke;
  strokes: Stroke[];
  historyIndex: number;
}
