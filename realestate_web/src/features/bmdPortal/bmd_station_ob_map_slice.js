import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    bmd_stationsmap: [], 
    msg: ''
  }; 
  export const loadBMDStationObserMap = createAsyncThunk("bmdportal/stationObserMap", () => {
    let req = { type: "get_summary_station_map", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDStationObserMApSlice = createSlice({
    name: "BMDStationObserMap",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDStationObserMap.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDStationObserMap.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.bmd_stationsmap = action.payload.data.station_map;
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDStationObserMap.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDStationObserMApSlice.reducer;