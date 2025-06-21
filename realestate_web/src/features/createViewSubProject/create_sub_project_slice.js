import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",
  typeLoading: "idle",  //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  infolist:{},
  sublist: [],
  dropdoenlist: [],
  addUpdateLoading: "idle",
  districtList: [],
  projectType: [],
  msg: "",
};

export const loadProjectNameList = createAsyncThunk("createsubproject/loadProjectName", () => {
  let req = { type: "get_project_name_list_running", data: {} };
  return socket.post(req);
});


export const loadSubProjectInfo = createAsyncThunk("createsubproject/loadSubProjectInfo", (data) => {
  let req = { type: "get_sub_project_list", data: data };
  return socket.post(req);
})
export const saveSubProjectInfo = createAsyncThunk("createsubproject/saveSubProjectInfo", (data) => {
  let req = { type: "save_sub_project_info", data: data };
  return socket.post(req);
});

export const loadSubProjectType = createAsyncThunk("createsubproject/loadSubProjectType", () => {
  let req = { type: "get_sub_project_type", data: {} };
  return socket.post(req);
});
export const loadSubProjectEdit = createAsyncThunk("createsubproject/loadSubProjectEdit", (data) => {
  let req = { type: "get_sub_project_info", data: data};
  return socket.post(req);
});


export const updateSubProjectInfo = createAsyncThunk("createsubproject/updateSubProjectInfo", (data) => {
  let req = { type: "update_sub_project_info", data: data };
  return socket.post(req);
});

export const deleteSubProjectInfo = createAsyncThunk("createsubproject/deleteSubProjectInfo", (data) => {
  let req = { type: "delete_sub_project_info", data: data };
  return socket.post(req);
});

const createsubprojectSlice = createSlice({
  name: "createsubproject",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle"  ) {
        state.addUpdateLoading = "idle";
      } 
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
    builder.addCase(loadSubProjectInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSubProjectInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.sub_project_list;
    });

    builder.addCase(loadSubProjectInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveSubProjectInfo.pending, (state, action) => {
      state.addUpdateLoading = "pending"
    });

    builder.addCase(saveSubProjectInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveSubProjectInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message
    }); 

    builder.addCase(loadSubProjectType.pending, (state) => {
      state.typeLoading = "pending";
    });

    builder.addCase(loadSubProjectType.fulfilled, (state, action) => {
      state.typeLoading = "succeeded";
      state.sublist = action.payload.data.sub_project_type;
    });

    builder.addCase(loadSubProjectType.rejected, (state, action) => {
      state.typeLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadSubProjectEdit.pending, (state) => {
      state.typeLoading = "pending";
    });

    builder.addCase(loadSubProjectEdit.fulfilled, (state, action) => {
      state.typeLoading = "succeeded";
      state.infolist = action.payload.data.sub_project_info;
    });

    builder.addCase(loadSubProjectEdit.rejected, (state, action) => {
      state.typeLoading = action.error.name;
      state.msg = action.error.message;
    });
 
    builder.addCase(updateSubProjectInfo.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateSubProjectInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });
    builder.addCase(updateSubProjectInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteSubProjectInfo.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteSubProjectInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteSubProjectInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default createsubprojectSlice.reducer;
export const { initLoader } = createsubprojectSlice.actions;
