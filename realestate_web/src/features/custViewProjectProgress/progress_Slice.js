import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  msg: ''
};

export const loadProgress = createAsyncThunk("dprogress/loadprogress", () => {
  
  let req = { type: "get_sub_project_name_list", data: {} };
  //console.log(req);
  return socket.post(req);
});
export const submitcusprojectConfig = createAsyncThunk(
  "project/submitConfig",
  () => {
    let req = { type: "get_sub_project_progress", data: {} };
    return socket.post(req);
  }
);

const dprogressSlice = createSlice({
  name: "dprogress",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.updateLoading == "succeeded" ||
        state.updateLoading == "failed"
      ) {
        state.updateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProgress.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProgress.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.project_name_list;
    });

    builder.addCase(loadProgress.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitcusprojectConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(submitcusprojectConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.investlist = action.payload.data.investment_info;
    });

    builder.addCase(submitcusprojectConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default dprogressSlice.reducer;
export const {initLoader} = dprogressSlice.actions;
