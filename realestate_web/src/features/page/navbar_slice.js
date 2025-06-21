import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    bulletinData:{},
    currentdate:{},
    publicMenu:[],
    msg: ''
};

export const loadTodayStatus = createAsyncThunk("navbar/today", () => {
    let req = { type: "get_modules_for_public", data: {} };
    return socket.post(req);
  });

  const loadTodayDataSlice = createSlice({
    name: "homepagedata",
    initialState,
    extraReducers: (builder) => {

      builder.addCase(loadTodayStatus.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadTodayStatus.fulfilled, (state, action) => {
        state.loading = "succeeded";  
        // state.bulletinData = action.payload.data.bulletin;
        // state.currentdate = action.payload.data.currentdate;
        state.publicMenu = action.payload.data.public_menu; 
        state.msg = "Successfully load Data"; 
      });
  
      builder.addCase(loadTodayStatus.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadTodayDataSlice.reducer;