import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    foreData: {}, 
    cliData: {}, 
    warningData: {},
    msg: ''
  };
  export const loadInfoData= createAsyncThunk("bmdportal/bmdforecastdata", (data) => { 
    let req = { type: "get_forecast_data", data: data }; 
    return socket.post(req);
  });

  export const loadCliData= createAsyncThunk("bmdportal/bmdclidata", (data) => { 
    let req = { type: "get_climate_data", data: data }; 
    return socket.post(req);
  });

  export const loadWarningData= createAsyncThunk("bmdportal/bmdwarningdata", (data) => { 
    let req = { type: "get_warning_data", data: data }; 
    return socket.post(req);
  });
 
  const bmdInfoDataSlice = createSlice({
    name: "bmdsopinfo",
    initialState,
    reducers: {
      initLoader: (state) => {
        if (
          state.loading == "succeeded" ||
          state.loading == "failed"
        ) {
          state.loading = "idle";
        }
      },
    },
    extraReducers: (builder) => {
      builder.addCase(loadInfoData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadInfoData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.foreData = action.payload.data.request_data;  
        //console.log(action.payload)
      });
  
      builder.addCase(loadInfoData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
      builder.addCase(loadCliData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadCliData.fulfilled, (state, action) => {
        state.loading = "succeeded";  
        state.cliData = action.payload.data.request_data;  
        //console.log(action.payload)
      });
  
      builder.addCase(loadCliData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 

      builder.addCase(loadWarningData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadWarningData.fulfilled, (state, action) => {
        state.loading = "succeeded";  
        state.warningData = action.payload.data.request_data; 
        //console.log(action.payload)
      });
  
      builder.addCase(loadWarningData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default bmdInfoDataSlice.reducer;
  export const { initLoader } = bmdInfoDataSlice.actions;