import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    bmddatatypes: [], 
    msg: ''
  };
  export const loadBMDDataTypes= createAsyncThunk("bmdportal/availabledata", () => {
    let req = { type: "get_bmd_data_types", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDDataTypesSlice = createSlice({
    name: "availabledatatypes",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDDataTypes.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDDataTypes.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.bmddatatypes = action.payload.data.bmd_data_types;
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDDataTypes.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDDataTypesSlice.reducer;