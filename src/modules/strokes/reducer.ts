import { RootState, Stroke } from "../../utils/types";
import { StrokeAction, END_STROKE } from "./actions";

export const reducer = (
  state: RootState["strokes"] = [],
  action: StrokeAction
): Stroke[] => {
  switch (action.type) {
    case END_STROKE: {
      const { historyIndex, stroke } = action.payload;
      if (!stroke.points.length) {
        return state;
      }
      return [...state.slice(0, state.length - historyIndex), stroke];
    }
    default: {
      return state;
    }
  }
};

export const strokesSelector = (state: RootState): Stroke[] => state.strokes;

export const strokesLengthSelector = (state: RootState): number =>
  state.strokes.length;
