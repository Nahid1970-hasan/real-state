import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dashboardState:{},
  msg: ''
};

export const loadDashboardState = createAsyncThunk("dashboard/loadDashboardStat", () => {
  
  let req = { type: "get_dashboard_stat", data: {} };
  return socket.post(req);
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadDashboardState.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadDashboardState.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dashboardState = action.payload.data; 
    });

    builder.addCase(loadDashboardState.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default dashboardSlice.reducer;
