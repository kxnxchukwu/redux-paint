import { endStroke } from "../sharedActions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Point } from "../../utils/types";

const initialState: RootState["currentStroke"] = {
  points: [],
  colour: "#000",
};

const slice = createSlice({
  name: "currentStroke",
  initialState,
  reducers: {
    beginStroke: (state, action: PayloadAction<Point>) => {
      state.points = [action.payload];
    },
    updateStroke: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
    },
    setStrokeColour: (state, action: PayloadAction<string>) => {
      state.colour = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state) => {
      state.points = [];
    });
  },
});

export const currentStroke = slice.reducer;

export const { beginStroke, updateStroke, setStrokeColour } = slice.actions;

export const currentStrokeSelector = (state: RootState) => state.currentStroke;
