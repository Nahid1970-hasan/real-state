import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    maritimeList: [], 
    inlandRiverList: [], 
    msg: ''
  };
  export const loadBMDSignalData= createAsyncThunk("bmdportal/signaldata", () => {
    let req = { type: "get_bmd_signals", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDSignalDataSlice = createSlice({
    name: "signaldata",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDSignalData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDSignalData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.maritimeList = action.payload.data.signals_maritime_list;
        state.inlandRiverList = action.payload.data.signals_inland_river_list;
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDSignalData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDSignalDataSlice.reducer;