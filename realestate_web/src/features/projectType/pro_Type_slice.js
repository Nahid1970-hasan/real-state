import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  list: [],
  msg: "",
};

export const loadProTypeConfig = createAsyncThunk(
  "protype/loadProjectType",
  () => {
    let req = { type: "get_project_type", data: {} }; 
    return socket.post(req);
  }
);

export const updateprotype = createAsyncThunk(
  "protype/updateProjectType",
  (data) => {
    let req = { type: "update_project_type", data: data }; 
    return socket.post(req);
  }
);

export const saveprotype = createAsyncThunk(
  "protype/saveProjectType",
  (data) => {
    let req = { type: "save_project_type", data: data }; 
    return socket.post(req);
  }
);

export const deleteprotype = createAsyncThunk(
  "protype/deleteProjectType",
  (data) => {
    let req = { type: "delete_project_type", data: data }; 
    return socket.post(req);
  }
);

const protypeSlice = createSlice({
  name: "protype",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle" ) state.addUpdateLoading = "idle"; 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProTypeConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProTypeConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.project_type;
    });

    builder.addCase(loadProTypeConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateprotype.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateprotype.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateprotype.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveprotype.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveprotype.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveprotype.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteprotype.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteprotype.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteprotype.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default protypeSlice.reducer;
export const { initLoader } = protypeSlice.actions;
