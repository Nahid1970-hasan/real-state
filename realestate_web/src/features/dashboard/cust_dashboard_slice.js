import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dashboardState:{},
  msg: ''
};

export const loadCustDashboard = createAsyncThunk("custdashboard/loadDashboardStat", () => {
  
  let req = { type: "get_cust_dashboard_data", data: {} };
  return socket.post(req);
});

const dashboardSlice = createSlice({
  name: "custdashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadCustDashboard.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadCustDashboard.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dashboardState = action.payload.data; 
    });

    builder.addCase(loadCustDashboard.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default dashboardSlice.reducer;
