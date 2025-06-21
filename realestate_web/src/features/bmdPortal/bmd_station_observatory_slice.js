import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    bmd_stations: [], 
    msg: ''
  }; 
  export const loadBMDStationObservatory = createAsyncThunk("bmdportal/stationObservatory", () => {
    let req = { type: "get_bmd_station_observatory", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDStationObservatorySlice = createSlice({
    name: "BMDStationObservatory",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDStationObservatory.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDStationObservatory.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.bmd_stations = action.payload.data.bmd_stations;
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDStationObservatory.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDStationObservatorySlice.reducer;