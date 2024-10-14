import { Point, Stroke } from "../../utils/types";

export const BEGIN_STROKE = "BEGIN_STROKE";
export const UPDATE_STROKE = "UPDATE_STROKE";
export const END_STROKE = "END_STROKE";
export const SET_STROKE_COLOUR = "SET_STROKE_COLOUR";

export type CurrentStrokeAction =
  | {
      type: typeof END_STROKE;
      payload: { stroke: Stroke; historyIndex: number };
    }
  | {
      type: typeof BEGIN_STROKE;
      payload: Point;
    }
  | {
      type: typeof UPDATE_STROKE;
      payload: Point;
    }
  | {
      type: typeof SET_STROKE_COLOUR;
      payload: string;
    };

interface StrokeActionOptions {
  x: number;
  y: number;
}
export const beginStroke = ({
  x,
  y,
}: StrokeActionOptions): CurrentStrokeAction => {
  return { type: BEGIN_STROKE, payload: { x, y } };
};

export const updateStroke = ({
  x,
  y,
}: StrokeActionOptions): CurrentStrokeAction => {
  return { type: UPDATE_STROKE, payload: { x, y } };
};

export const setStrokeColour = (colour: string): CurrentStrokeAction => {
  return { type: SET_STROKE_COLOUR, payload: colour };
};

export const endStroke = ({
  stroke,
  historyIndex,
}: {
  stroke: Stroke;
  historyIndex: number;
}): CurrentStrokeAction => {
  return { type: END_STROKE, payload: { stroke, historyIndex } };
};
