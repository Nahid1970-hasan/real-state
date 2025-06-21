import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  summaryData:{},
  msg: "",
}; 

  export const loadComSummary = createAsyncThunk(
    "comsummary/loaddata",
    () => {
      let req = { type: "get_total_summary", data: {} }; 
      return socket.post(req);
    }
  );
  
const summarySlice = createSlice({
  name: "comsummary",
  initialState, 
  extraReducers: (builder) => {
    builder.addCase(loadComSummary.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadComSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.summaryData = action.payload.data.summary;
      });
  
      builder.addCase(loadComSummary.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });
  
  },
});

export default summarySlice.reducer;
export const { initLoader } = summarySlice.actions;
