import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
    detailLoading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
    projectList: [], 
    subProjectList:[], 
    projectDetail:{},
    subProjectDetail:{},
    msg: ''
  };
  export const loadProjectByCriteria = createAsyncThunk("homepagesearch/loaddata", (data) => {
    let req = { type: "get_searched_projects", data: data }; 
    return socket.post(req);
  });

  export const loadProjectDetailsByCriteria = createAsyncThunk("homepagesearch/loaddetail", (data) => {
    let req = { type: "get_project_detail", data: data }; 
    return socket.post(req);
  });

  export const loadSubProjectDetails = createAsyncThunk("homepagesearch/loadsubdetail", (data) => {
    let req = { type: "get_sub_project_detail", data: data }; 
    return socket.post(req);
  });

  const loadHomepageSearchSlice = createSlice({
    name: "homepagesearch",
    initialState,
    reducers: {
        initLoader: (state) => {
          state.projectList=[];
          if(state.detailLoading!="idle") state.detailLoading="idle";
        },  
      },
    extraReducers: (builder) => {
      builder.addCase(loadProjectByCriteria.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadProjectByCriteria.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.projectList = action.payload.data.project_list; 
        state.msg = ""; 
      });
  
      builder.addCase(loadProjectByCriteria.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
       
      builder.addCase(loadProjectDetailsByCriteria.pending, (state) => {
        state.detailLoading = "pending";
      });
  
      builder.addCase(loadProjectDetailsByCriteria.fulfilled, (state, action) => {
        state.detailLoading = "succeeded"; 
        state.projectDetail = action.payload.data.project_detail; 
        state.subProjectList = action.payload.data.sub_project_info; 
        state.msg = ""; 
      });
  
      builder.addCase(loadProjectDetailsByCriteria.rejected, (state, action) => {
        state.detailLoading = action.error.name;
        state.msg = action.error.message;
      }); 

      builder.addCase(loadSubProjectDetails.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadSubProjectDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";  
        state.subProjectDetail = action.payload.data.sub_project_detail; 
        state.msg = ""; 
      });
  
      builder.addCase(loadSubProjectDetails.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
       
    },
  });

  export default loadHomepageSearchSlice.reducer;
  export const { initLoader } = loadHomepageSearchSlice.actions;