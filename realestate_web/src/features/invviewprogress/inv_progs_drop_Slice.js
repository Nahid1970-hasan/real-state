import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  detailLoading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  progresslist:[],
  msg: ''
};

export const loadInvViewprgs = createAsyncThunk("invviewprgs/loainvviewprgs", () => {
  
  let req = { type: "get_inv_project_name_list", data: {} }; 
  return socket.post(req);
});
export const submitConfig = createAsyncThunk(
  "invviewprgs/submitConfig",
  (data) => {
    let req = { type: "get_inv_project_progress", data: data }; 
    return socket.post(req);
  }
);

const invviewProgressSlice = createSlice({
  name: "invviewprgs",
  initialState,
  reducers: {
    initProgresslist: (state) => {
       state.progresslist=[];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvViewprgs.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvViewprgs.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.project_name;
    });

    builder.addCase(loadInvViewprgs.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(submitConfig.pending, (state) => {
      state.detailLoading = "pending";
    });

    builder.addCase(submitConfig.fulfilled, (state, action) => {
      state.detailLoading = "succeeded";
      state.progresslist = action.payload.data.progress;
    });

    builder.addCase(submitConfig.rejected, (state, action) => {
      state.detailLoading = action.error.name;
      state.msg = action.error.message;
    });

  },
});


export default invviewProgressSlice.reducer;
export const {initProgresslist} = invviewProgressSlice.actions;
