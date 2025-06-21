import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  deposit:[],
  investment:[],
  release:[],
  withdrawl:[],
  msg: "",
};

export const loadInvSummaryConfig = createAsyncThunk(
  "invsummary/loadConfig",
  () => {
    let req = { type: "get_inv_summary", data: {} }; 
    return socket.post(req);
  }
);



const invsummarySlice = createSlice({
  name: "invsummary",
  initialState,
 
  extraReducers: (builder) => {
    builder.addCase(loadInvSummaryConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvSummaryConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.deposit = action.payload.data.deposit;
      state.investment=action.payload.data.investment;
      state.release = action.payload.data.release;
      state.withdrawl=action.payload.data.withdrawl;
    });

    builder.addCase(loadInvSummaryConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });


  },
});

export default invsummarySlice.reducer; 
