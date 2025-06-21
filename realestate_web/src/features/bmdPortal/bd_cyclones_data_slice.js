import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    cyclones_detail: {},
    cyclones:{},  
    msg: ''
  };
  export const loadBDCyclonedata= createAsyncThunk("bmdportal/cycloneinfo", () => {
    let req = { type: "get_bmd_cyclone_hist", data: {} }; 
    return socket.post(req);
  });
 
  const loadBDCycloneInfoSlice = createSlice({
    name: "bmdsopinfo",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBDCyclonedata.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBDCyclonedata.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.cyclones = action.payload.data.cyclones; 
        state.cyclones_detail = action.payload.data.cyclones_detail; 
        //console.log(action.payload)
      });
  
      builder.addCase(loadBDCyclonedata.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBDCycloneInfoSlice.reducer;