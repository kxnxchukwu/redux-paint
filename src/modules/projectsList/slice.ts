import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../utils/types";
import { fetchProjectsList } from "./api";

const initialState: RootState["projectsList"] = {
  error: undefined,
  pending: false,
  projects: [],
};

export const getProjectsList = createAsyncThunk(
  "GET_PROJECTS_LIST",
  async () => {
    return fetchProjectsList();
  }
);

const slice = createSlice({
  name: "projectsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectsList.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(getProjectsList.fulfilled, (state, action) => {
      state.pending = false;
      state.projects = action.payload;
      state.error = undefined;
    });
    builder.addCase(getProjectsList.rejected, (state) => {
      state.pending = false;
      state.error = "Something went wrong";
    });
  },
});

export const projectsList = slice.reducer;

export const projectsListSelector = (state: RootState) => {
  return state.projectsList.projects ?? [];
};

export const projectsListPendingSelector = (state: RootState): boolean => {
  return state.projectsList.pending;
};

export const projectsListErrorSelector = (state: RootState) => {
  return state.projectsList.error;
};
