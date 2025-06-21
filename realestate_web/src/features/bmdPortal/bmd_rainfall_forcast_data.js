import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    intensityList: [], 
    areaList: [], 
    msg: ''
  };
  export const loadBMDRainfallData= createAsyncThunk("bmdportal/rainfallData", () => {
    let req = { type: "get_bmd_rainfall_forecast", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDRainfallDataSlice = createSlice({
    name: "rainfallData",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDRainfallData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDRainfallData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.intensityList = action.payload.data.rainfall_intensity_list;
        state.areaList = action.payload.data.rainfall_area_list;
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDRainfallData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDRainfallDataSlice.reducer;