import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", 
  list: [],
  infolist:[],
  sublist: [],
  dropdoenlist: [],
  addUpdateLoading: "idle",
  districtList: [],
  msg: "",
};

export const loadProjectNameList = createAsyncThunk("milestonesetup/loadProjectName", () => {
  let req = { type: "get_project_name_list_running", data: {} };
  return socket.post(req);
});


export const loadMilestoneInfo = createAsyncThunk("milestonesetup/loadMilestoneInfo", (data) => {
  let req = { type: "get_project_milestone_info", data: data };
  return socket.post(req);
})
export const saveMilestonesetup = createAsyncThunk("milestonesetup/saveMilestonesetup", (data) => {
  let req = { type: "save_project_milestone_info", data: data };
  return socket.post(req);
});


export const loadMilestoneDetail = createAsyncThunk("milestonesetup/loadMilestoneDetail", (data) => {
    let req = { type: "get_milestone_detail_info", data: data};
    return socket.post(req);
  });
  

export const saveMilestoneDetail = createAsyncThunk("milestonesetup/saveMilestoneDetail", (data) => {
  let req = { type: "save_milestone_detail_info", data: data };
  return socket.post(req);
});

export const deleteMilestoneSetup = createAsyncThunk("milestonesetup/deleteMilestoneSetup", (data) => {
  let req = { type: "delete_project_milestone_info", data: data };
  return socket.post(req);
});

const milestonesetupSlice = createSlice({
  name: "milestonesetup",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle"
      ) {
        state.addUpdateLoading = "idle";
      }
    },
    subMilestoneInit: (state, action) => {
      state.infolist=[];
    },
  },
  extraReducers: (builder) => {

    builder.addCase(loadProjectNameList.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadProjectNameList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dropdoenlist = action.payload.data.project_name;
    });

    builder.addCase(loadProjectNameList.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadMilestoneInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadMilestoneInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.milestone;
    });

    builder.addCase(loadMilestoneInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveMilestonesetup.pending, (state, action) => {
      state.addUpdateLoading = "pending"
    });

    builder.addCase(saveMilestonesetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveMilestonesetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message
    }); 

    builder.addCase(loadMilestoneDetail.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadMilestoneDetail.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.infolist = action.payload.data.milestone_detail;
      });
  
      builder.addCase(loadMilestoneDetail.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });
 
    builder.addCase(saveMilestoneDetail.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveMilestoneDetail.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });
    builder.addCase(saveMilestoneDetail.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteMilestoneSetup.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteMilestoneSetup.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteMilestoneSetup.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default milestonesetupSlice.reducer;
export const { initLoader, subMilestoneInit } = milestonesetupSlice.actions;
