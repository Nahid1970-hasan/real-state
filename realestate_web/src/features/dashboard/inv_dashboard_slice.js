import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dashboardState:{},
  own_bank:{},
  companyBank:{},
  lastPayment:{},
  msg: ''
};

export const loadInvDashboard = createAsyncThunk("invdashboard/loadDashboardStat", () => {
  
  let req = { type: "get_inv_dashboard_data", data: {} };
  return socket.post(req);
});

const dashboardSlice = createSlice({
  name: "invdashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadInvDashboard.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvDashboard.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dashboardState = action.payload.data; 
      state.own_bank = action.payload.data.own_bank||[]; 
      state.companyBank = action.payload.data.company_bank||[]; 
      state.lastPayment = action.payload.data.last_payment||[]; 
    });

    builder.addCase(loadInvDashboard.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default dashboardSlice.reducer;
