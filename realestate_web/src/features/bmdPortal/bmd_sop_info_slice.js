import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    list: [],  
    msg: ''
  };
  export const loadBMDSopdata= createAsyncThunk("bmdportal/bmdsopinfo", () => {
    let req = { type: "bmdsopinfo", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDSopInfoSlice = createSlice({
    name: "bmdsopinfo",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDSopdata.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDSopdata.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.list = action.payload.data.list; 
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDSopdata.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDSopInfoSlice.reducer;