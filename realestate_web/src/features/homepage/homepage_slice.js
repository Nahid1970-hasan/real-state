import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    projectType: [],
    thanaList: [],  
    projectList: [],  
    msg: ''
  };
  export const loadHomepageData = createAsyncThunk("homepage/state", () => {
    let req = { type: "get_homepage_data", data: {} }; 
    return socket.post(req);
  });
 
  const loadHomepageDataSlice = createSlice({
    name: "homepagedata",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadHomepageData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadHomepageData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.projectType = action.payload.data.project_type;
        state.thanaList = action.payload.data.thana_list; 
        state.projectList = action.payload.data.project_list; 
        state.msg = ""; 
      });
  
      builder.addCase(loadHomepageData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
 
    },
  });

  export default loadHomepageDataSlice.reducer;