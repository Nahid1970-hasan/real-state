import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    focalPointData: [], 
    msg: ''
  }; 
  export const loadBMDFocalPoints = createAsyncThunk("bmdportal/focalPoints", () => {
    let req = { type: "get_bmd_focal_points", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDFocalPointsSlice = createSlice({
    name: "BMDFocalPointsData",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDFocalPoints.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDFocalPoints.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.focalPointData = action.payload.data.bmd_focal_point;
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDFocalPoints.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDFocalPointsSlice.reducer;