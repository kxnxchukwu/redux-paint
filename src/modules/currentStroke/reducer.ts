import {
  CurrentStrokeAction,
  UPDATE_STROKE,
  END_STROKE,
  BEGIN_STROKE,
  SET_STROKE_COLOUR,
} from "./actions";
import { RootState, Stroke } from "../../utils/types";

const INITIAL_STATE: RootState["currentStroke"] = {
  points: [],
  colour: "#000",
};

export const reducer = (
  state: RootState["currentStroke"] = INITIAL_STATE,
  action: CurrentStrokeAction
): Stroke => {
  switch (action.type) {
    case END_STROKE: {
      return {
        ...state,
        points: [],
      };
    }
    case BEGIN_STROKE: {
      return {
        ...state,
        points: [action.payload],
      };
    }
    case UPDATE_STROKE: {
      return {
        ...state,
        points: [...state.points, action.payload],
      };
    }
    case SET_STROKE_COLOUR: {
      return {
        ...state,
        colour: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const currentStrokeSelector = (state: RootState): Stroke =>
  state.currentStroke;
