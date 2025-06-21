import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  list: [],
  msg: "",
};

export const loadSubProtypeConfig = createAsyncThunk(
  "subprotype/loadSubType",
  () => {
    let req = { type: "get_sub_project_type", data: {} }; 
    return socket.post(req);
  }
);

export const updateSubProtype = createAsyncThunk(
  "subprotype/updateSubType",
  (data) => {
    let req = { type: "update_sub_project_type", data: data }; 
    return socket.post(req);
  }
);

export const saveSubProtype = createAsyncThunk(
  "subprotype/saveSubType",
  (data) => {
    let req = { type: "save_sub_project_type", data: data }; 
    return socket.post(req);
  }
);

export const deleteSubProtype = createAsyncThunk(
  "subprotype/deleteSubType",
  (data) => {
    let req = { type: "delete_sub_project_type", data: data }; 
    return socket.post(req);
  }
);

const subprotypeSlice = createSlice({
  name: "subprotype",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSubProtypeConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSubProtypeConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.sub_project_type;
    });

    builder.addCase(loadSubProtypeConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateSubProtype.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateSubProtype.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateSubProtype.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveSubProtype.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveSubProtype.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveSubProtype.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteSubProtype.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteSubProtype.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteSubProtype.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default subprotypeSlice.reducer;
export const { initLoader } = subprotypeSlice.actions;
