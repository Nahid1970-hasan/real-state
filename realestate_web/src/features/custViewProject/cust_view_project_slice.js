import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  typeLoading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  subProjectLoading: "idle",
  addUpdateLoading:"idle",
  list: [],
  typeList:[],
  subProjectDetails:{},
  subProjectName:[],
  msg: ''
};
export const loadProjectInt = createAsyncThunk("custviewproject/loadProjectInit", () => { 
  let req = { type: "get_cust_project_list_init", data: {} }; 
  return socket.post(req);
});

export const loadProject = createAsyncThunk("custviewproject/loadProject", (data) => { 
  let req = { type: "get_cust_project_list", data: data }; 
  return socket.post(req);
});

export const loadProjectTypeList = createAsyncThunk("custviewproject/loadProjectType", () => { 
  let req = { type: "get_project_type", data: {} }; 
  return socket.post(req);
});

export const loadSubProjectDetails = createAsyncThunk("custviewproject/loadsubproject", (data) => { 
    let req = { type: "get_sub_project_detail", data: data }; 
    return socket.post(req);
  });

  export const loadSubProjectInfo = createAsyncThunk("custviewproject/loadSubProjectList", (data) => { 
    let req = { type: "get_cust_sub_project_info", data: data }; 
    return socket.post(req);
  });
  export const loadSubProjectNamelist = createAsyncThunk("custviewproject/loadSubProjectNameList", (data) => { 
    let req = { type: "get_sub_project_name_list", data: data }; 
    return socket.post(req);
  })
  

  export const saveBookingConfig = createAsyncThunk(
    "custviewproject/saveBookingInfo",
    (data) => {
      let req = { type: "save_booking_info", data: data };
      return socket.post(req);
    }
  );

const custViewProjectSlice = createSlice({
  name: "custviewproject",
  initialState,
  reducers: {
    initLoader: (state) => { 
      if (
        state.addUpdateLoading != "idle"  
      ) {
        state.addUpdateLoading = "idle";
      }
    },
    initSubLoader: (state) => { 
      if (
        state.subProjectLoading != "idle"  
      ) {
        state.subProjectLoading = "idle";
      }
    },
    initiateDetails: (state) => { 
      state.subProjectDetails ={};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProjectInt.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProjectInt.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.project_list;
    });

    builder.addCase(loadProjectInt.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadProject.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProject.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.project_list;
    });

    builder.addCase(loadProject.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadProjectTypeList.pending, (state) => {
      state.typeLoading = "pending";
    });

    builder.addCase(loadProjectTypeList.fulfilled, (state, action) => {
      state.typeLoading = "succeeded";
      state.typeList = action.payload.data.project_type;
    });

    builder.addCase(loadProjectTypeList.rejected, (state, action) => {
      state.typeLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadSubProjectInfo.pending, (state) => {
      state.subProjectLoading = "pending";
    });

    builder.addCase(loadSubProjectInfo.fulfilled, (state, action) => {
      state.subProjectLoading = "succeeded";
      state.subProjectDetails = action.payload.data.sub_project_info;
    });

    builder.addCase(loadSubProjectInfo.rejected, (state, action) => {
      state.subProjectLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadSubProjectNamelist.pending, (state) => {
      state.subProjectLoading = "pending";
    });

    builder.addCase(loadSubProjectNamelist.fulfilled, (state, action) => {
      state.subProjectLoading = "succeeded";
      state.subProjectName = action.payload.data.sub_project_name_list;
    });

    builder.addCase(loadSubProjectNamelist.rejected, (state, action) => {
      state.subProjectLoading = action.error.name;
      state.msg = action.error.message;
    });
    

    builder.addCase(saveBookingConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveBookingConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveBookingConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default custViewProjectSlice.reducer;
export const {initLoader, initSubLoader, initiateDetails} = custViewProjectSlice.actions;
