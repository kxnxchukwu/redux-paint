import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/types";
import { endStroke } from "../sharedActions";
import { newProject } from "../../api";
import { getProjectById } from "../projectsList/slice";

const initialState: RootState["strokes"] = [];

type SaveProjectArg = {
  projectName: string;
  thumbnail: string;
};

export const saveProject = createAsyncThunk(
  "SAVE_PROJECT",
  async ({ projectName, thumbnail }: SaveProjectArg, { getState }) => {
    const data = {
      name: projectName,
      image: thumbnail,
      strokes: (getState() as RootState)?.strokes,
    };
    try {
      const response = await newProject(data);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const loadProject = createAsyncThunk(
  "LOAD_PROJECT",
  async (projectId: string, { getState }) => {
    try {
      const project = await getProjectById(getState() as RootState, projectId);
      return project;
    } catch (error) {
      console.error(error);
    }
  }
);

const strokes = createSlice({
  name: "strokes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { historyIndex, stroke } = action.payload;
      if (historyIndex === 0) {
        state.push(stroke);
      } else {
        state.splice(-historyIndex, historyIndex, stroke);
      }
    });
    builder.addCase(loadProject.fulfilled, (state, action) => {
      return action.payload?.strokes;
    });
  },
});

export default strokes.reducer;

export const strokesLengthSelector = (state: RootState) => state.strokes.length;

export const strokesSelector = (state: RootState) => state.strokes;
