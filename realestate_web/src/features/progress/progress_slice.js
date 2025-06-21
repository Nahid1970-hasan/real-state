import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  detailLoading: "idle",
  list: [],
  detailList:[],
  msg: "",
};

export const loadProgressConfig = createAsyncThunk(
  "progress/loadConfig",
  () => {
    let req = { type: "get_project_progress_info", data: {} }; 
    return socket.post(req);
  }
);

export const loadProgressDetail = createAsyncThunk(
    "progress/loadDetail",
    (data) => {
      let req = { type: "get_project_progress_detail", data: data }; 
      return socket.post(req);
    }
  )



const progressSlice = createSlice({
  name: "progress",
  initialState, 
  reducers: { 
    detailDataInit: (state, action) => {
      state.detailList=[];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProgressConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProgressConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.progress;
    });

    builder.addCase(loadProgressConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadProgressDetail.pending, (state) => {
        state.detailLoading = "pending";
      });
  
      builder.addCase(loadProgressDetail.fulfilled, (state, action) => {
        state.detailLoading = "succeeded";
        state.detailList = action.payload.data.progress_detail;
      });
  
      builder.addCase(loadProgressDetail.rejected, (state, action) => {
        state.detailLoading = action.error.name;
        state.msg = action.error.message;
      });
    
  },
});

export default progressSlice.reducer; 
export const { detailDataInit } = progressSlice.actions;
