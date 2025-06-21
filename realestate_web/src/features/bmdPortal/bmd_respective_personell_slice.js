import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    bmdResPersonList: [], 
    msg: ''
  };
  

  export const loadBMDRespectivePersonell = createAsyncThunk("bmdportal/respectivePersonell", () => {
    let req = { type: "get_bmd_respective_personell", data: {} }; 
    return socket.post(req);
  });

  
  const loadBMDRespectivePersonellSlice = createSlice({
    name: "BMDRespectivePersonellData",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDRespectivePersonell.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDRespectivePersonell.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.bmdResPersonList = action.payload.data.bmd_respective_person;
        //console.log(action.payload.data.bmd_respective_person)
      });
  
      builder.addCase(loadBMDRespectivePersonell.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDRespectivePersonellSlice.reducer;