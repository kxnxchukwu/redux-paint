import { Stroke } from "../../utils/types";

export const END_STROKE = "END_STROKE";

export type StrokeAction = {
  type: typeof END_STROKE;
  payload: { stroke: Stroke; historyIndex: number };
};

export const endStroke = ({
  stroke,
  historyIndex,
}: {
  stroke: Stroke;
  historyIndex: number;
}): StrokeAction => {
  return { type: END_STROKE, payload: { stroke, historyIndex } };
};
