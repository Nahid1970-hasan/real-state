import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    tropicalDisturbanceList: [],  
    msg: ''
  };
  export const loadBMDTropicalDisturbanceData= createAsyncThunk("bmdportal/tropicalDisturbance", () => {
    let req = { type: "get_bmd_tropical_disturbance", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDTropicalDisturbanceDataSlice = createSlice({
    name: "tropicalDisturbance",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDTropicalDisturbanceData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDTropicalDisturbanceData.fulfilled, (state, action) => {
        state.loading = "succeeded";  
        state.tropicalDisturbanceList = action.payload.data.coldwave_category_list;
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDTropicalDisturbanceData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDTropicalDisturbanceDataSlice.reducer;