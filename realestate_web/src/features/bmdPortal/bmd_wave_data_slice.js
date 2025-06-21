import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    coldWaveList: [], 
    heatWaveList: [], 
    msg: ''
  };
  export const loadBMDWaveData= createAsyncThunk("bmdportal/wavedatalist", () => {
    let req = { type: "get_bmd_cold_heat_wave", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDWaveDataSlice = createSlice({
    name: "wavedatalist",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDWaveData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDWaveData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.coldWaveList = action.payload.data.heatwave_category_list;
        state.heatWaveList = action.payload.data.coldwave_category_list;
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDWaveData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDWaveDataSlice.reducer;