import { legacy_createStore as createStore, combineReducers } from "redux";
import { reducer as strokes } from "./modules/strokes/reducer";
import { reducer as currentStroke } from "./modules/currentStroke/reducer";
import { reducer as historyIndex } from "./modules/historyIndex/reducer";

export const store = createStore(
  combineReducers({
    strokes,
    currentStroke,
    historyIndex,
  })
);
