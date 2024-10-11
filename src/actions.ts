import { Point } from "./utils/types";

export const BEGIN_STROKE = "BEGIN_STROKE";
export const UPDATE_STROKE = "UPDATE_STROKE";
export const END_STROKE = "END_STROKE";
export const SET_STROKE_COLOUR = "SET_STROKE_COLOUR";
export const UNDO = "UNDO";
export const REDO = "REDO";

export type Action =
  | {
      type: typeof BEGIN_STROKE;
      payload: Point;
    }
  | {
      type: typeof UPDATE_STROKE;
      payload: Point;
    }
  | {
      type: typeof END_STROKE;
    }
  | {
      type: typeof SET_STROKE_COLOUR;
      payload: string;
    }
  | {
      type: typeof UNDO;
    }
  | {
      type: typeof REDO;
    };

interface StrokeActionOptions {
  x: number;
  y: number;
}
export const beginStroke = ({ x, y }: StrokeActionOptions): Action => {
  return { type: BEGIN_STROKE, payload: { x, y } };
};

export const updateStroke = ({ x, y }: StrokeActionOptions): Action => {
  return { type: UPDATE_STROKE, payload: { x, y } };
};

export const endStroke = (): Action => {
  return { type: END_STROKE };
};

export const setStrokeColour = (colour: string): Action => {
  return { type: SET_STROKE_COLOUR, payload: colour };
};

export const undo = (): Action => {
  return { type: UNDO };
};

export const redo = (): Action => {
  return { type: REDO };
};
