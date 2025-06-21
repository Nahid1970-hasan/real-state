import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    heatwave_category_list: [], 
    signals_maritime_list: [], 
    signals_inland_river_list: [], 
    rainfall_intensity_list: [], 
    coldwave_category_list: [], 
    rainfall_area_list: [], 
    msg: ''
  };
 

  export const loadBMDReferenceData = createAsyncThunk("bmdportal/referenceData", () => {
    let req = { type: "get_bmd_reference_data", data: {} }; 
    let res = { "tag" :"success" ,"heatwave_category_list":[],"signals_maritime_list":[],"signals_inland_river_list":[],"rainfall_intensity_list":[],"coldwave_category_list":[],"rainfall_area_list":[] }
    return res;
  });
  
  const loadBMDReferenceDataSlice = createSlice({
    name: "BMDReferenceData",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDReferenceData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDReferenceData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.heatwave_category_list = action.payload.data.heatwave_category_list;
        state.signals_maritime_list = action.payload.data.signals_maritime_list;
        state.signals_inland_river_list = action.payload.data.signals_inland_river_list;
        state.rainfall_intensity_list = action.payload.data.rainfall_intensity_list;
        state.coldwave_category_list = action.payload.data.coldwave_category_list;
        state.rainfall_area_list = action.payload.data.rainfall_area_list; 
      });
  
      builder.addCase(loadBMDReferenceData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDReferenceDataSlice.reducer;