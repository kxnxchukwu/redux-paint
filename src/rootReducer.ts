import {
  Action,
  UPDATE_STROKE,
  END_STROKE,
  BEGIN_STROKE,
  SET_STROKE_COLOUR,
  UNDO,
  REDO,
} from "./actions";
import { RootState, Stroke } from "./utils/types";

const INITIAL_STATE: RootState = {
  currentStroke: { points: [], colour: "#000" },
  strokes: [],
  historyIndex: 0,
};

export const rootReducer = (
  state: RootState = INITIAL_STATE,
  action: Action
): RootState => {
  switch (action.type) {
    case BEGIN_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [action.payload],
        },
      };
    }
    case UPDATE_STROKE: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          points: [...state.currentStroke.points, action.payload],
        },
      };
    }
    case END_STROKE: {
      if (!state.currentStroke.points.length) {
        return state;
      }
      const historyIndex = state.strokes.length - state.historyIndex;
      return {
        ...state,
        historyIndex: 0,
        currentStroke: {
          ...state.currentStroke,
          points: [],
        },
        strokes: [...state.strokes.slice(0, historyIndex), state.currentStroke],
      };
    }
    case SET_STROKE_COLOUR: {
      return {
        ...state,
        currentStroke: {
          ...state.currentStroke,
          ...{ colour: action.payload },
        },
      };
    }
    case UNDO: {
      const historyIndex = Math.min(
        state.historyIndex + 1,
        state.strokes.length
      );
      return {
        ...state,
        historyIndex,
      };
    }
    case REDO: {
      const historyIndex = Math.max(state.historyIndex - 1, 0);
      return {
        ...state,
        historyIndex,
      };
    }
    default:
      return state;
  }
};

export const currentStrokeSelector = (state: RootState): Stroke =>
  state.currentStroke;

export const historyIndexSelector = (state: RootState): number =>
  state.historyIndex;

export const strokesSelector = (state: RootState): Stroke[] => state.strokes;
