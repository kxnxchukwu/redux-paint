import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import strokes from "./modules/strokes/slice";
import { currentStroke } from "./modules/currentStroke/slice";
import { modalVisible } from "./modules/modals/slice";
import historyIndex from "./modules/historyIndex/slice";
import { projectsList } from "./modules/projectsList/slice";
import { RootState } from "./utils/types";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    strokes,
    currentStroke,
    historyIndex,
    modalVisible,
    projectsList,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
