import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle",
  list: [],
  projectlist:{},
  msg: "",
};


export const loadProjectSumInfo = createAsyncThunk(
    "prosummary/loadConfig",
    () => {
      let req = { type: "get_project_name_list", data: {} }; 
      return socket.post(req);
    }
  );

  export const submitProjectSummary = createAsyncThunk(
    "prosummary/submitConfig",
    (data) => {
      let req = { type: "get_project_summary", data: data }; 
      return socket.post(req);
    }
  );
  export const updateSummeryConfig = createAsyncThunk(
    "prosummary/updateConfig",
    (data) => {
      let req = { type: "update_project_summary", data: data };
     
      return socket.post(req);
    }
  );

const summarySlice = createSlice({
  name: "prosummary",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProjectSumInfo.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadProjectSumInfo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.list = action.payload.data.project_name;
      });
  
      builder.addCase(loadProjectSumInfo.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });

      builder.addCase(submitProjectSummary.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(submitProjectSummary.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.projectlist = action.payload.data.project;
      });
  
      builder.addCase(submitProjectSummary.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });
      builder.addCase(updateSummeryConfig.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateSummeryConfig.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(updateSummeryConfig.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
 
  },
});

export default summarySlice.reducer;
export const { initLoader } = summarySlice.actions;
