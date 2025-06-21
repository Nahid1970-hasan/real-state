import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  detailLoading: "idle", //"
  list: [],
  projectList:[],
  updateLoading: "idle",
  msg: "",
};

export const loadProjectNameList = createAsyncThunk("custvpprogress/loadprojectname", () => {
  let req = { type: "get_cust_project_name_list", data: {} }; 
  return socket.post(req);
});

export const loadSubProjectProgressData = createAsyncThunk("custvpprogress/loadsubprojectprogress", (data) => {
  let req = { type: "get_cust_sub_project_progress", data: data }; 
  return socket.post(req);
});


const custVPProgressSlice = createSlice({
  name: "custvpprogress",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (  state.updateLoading != "idle") {
        state.updateLoading = "idle";
      }
    },
    initProgresslist: (state) => {
      state.list=[];
   },
  },
  extraReducers: (builder) => {

    builder.addCase(loadProjectNameList.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProjectNameList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.projectList = action.payload.data.project_name || [];
    });

    builder.addCase(loadProjectNameList.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadSubProjectProgressData.pending, (state) => {
      state.detailLoading = "pending";
    });

    builder.addCase(loadSubProjectProgressData.fulfilled, (state, action) => {
      state.detailLoading = "succeeded";
      state.list = action.payload.data.progress || [];
    });

    builder.addCase(loadSubProjectProgressData.rejected, (state, action) => {
      state.detailLoading = action.error.name;
      state.msg = action.error.message;
    });


  },
});

export default custVPProgressSlice.reducer;
export const {initLoader, initProgresslist} = custVPProgressSlice.actions;
