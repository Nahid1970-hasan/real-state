import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",
  refLoading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  sharesell: 0,
  projectInfo:{},
  districtList:[],
  projectType:[], 
  addUpdateLoading: "idle", 
  msg: "",
};

export const loadProjectListInit = createAsyncThunk("createproject/getProjectListInit", () => {
  let req = { type: "get_project_list_init", data: {} };
  return socket.post(req);
});
 
export const loadProjectInfo= createAsyncThunk("createproject/getProjectInfo", (data) => { 
  let req = { type: "get_project_info", data: data }; 
  return socket.post(req);
});

export const loadProjectRefData = createAsyncThunk("createproject/getProjectRefData", () => {
  let req = { type: "get_project_ref_data", data: {} }; 
  return socket.post(req);
});

export const saveProjectInfo = createAsyncThunk("createproject/saveProjectInfo", (data) => {
  let req = { type: "save_project_info", data: data };
  return socket.post(req);
});

export const loadProjectList = createAsyncThunk("createproject/getProjectList", (data) => {
  let req = { type: "get_project_list", data: data };
  return socket.post(req);
});

export const updateProjectInfo= createAsyncThunk("createproject/updateProjectInfo", (data) => { 
    let req = { type: "update_project_info", data: data }; 
    return socket.post(req);
});

export const deleteProjectInfo = createAsyncThunk("createproject/deleteProjectInfo", (data) => {
    let req = { type: "delete_project_info", data: data }; 
    return socket.post(req);
});

const createprojectSlice = createSlice({
  name: "createproject",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      } 
      if (state.refLoading != "idle") {
        state.refLoading = "idle";
      } 
    },
  },
  extraReducers: (builder) => { 
    builder.addCase(loadProjectListInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProjectListInit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.project_list; 
    });

    builder.addCase(loadProjectListInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
 
    builder.addCase(loadProjectRefData.pending, (state) => {
      state.refLoading = "pending";
    });

    builder.addCase(loadProjectRefData.fulfilled, (state, action) => {
      state.refLoading = "succeeded";
      state.projectType = action.payload.data.project_type; 
      state.districtList = action.payload.data.district_list; 
      state.sharesell = action.payload.data.ShareSellPercent; 
    });

    builder.addCase(loadProjectRefData.rejected, (state, action) => {
      state.refLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadProjectInfo.pending, (state, action) => {
      state.loading = "pending"
    });

    builder.addCase(loadProjectInfo.fulfilled, (state, action) => { 
      state.loading = "succeeded";
      state.projectInfo = action.payload.data.project_info;
    });

    builder.addCase(loadProjectInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message
    }); 

    builder.addCase(saveProjectInfo.pending, (state, action) => {
      state.addUpdateLoading = "pending"
    });

    builder.addCase(saveProjectInfo.fulfilled, (state, action) => { 
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveProjectInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message
    }); 
    builder.addCase(loadProjectList.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProjectList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.project_list; 
    });

    builder.addCase(loadProjectList.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(deleteProjectInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(deleteProjectInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(deleteProjectInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
      builder.addCase(updateProjectInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateProjectInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
      builder.addCase(updateProjectInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });


  },
});

export default createprojectSlice.reducer;
export const { initLoader } = createprojectSlice.actions;
