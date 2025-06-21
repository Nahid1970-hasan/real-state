import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  tempLoading: "idle", 
  list: [],
  tempList:[],
  msg: "",
};

export const loadReleaselInfoInit = createAsyncThunk(
  "stackrelease/loadreleaseinfoInit",
  () => {
    let req = { type: "get_release_info_init", data: {} }; 
    return socket.post(req);
  }
);

export const loadReleaselInfo = createAsyncThunk(
  "stackrelease/loadreleaseinfo",
  (data) => {
    let req = { type: "get_release_info", data: data }; 
    return socket.post(req);
  }
);

export const updateReleaseAck = createAsyncThunk(
  "stackrelease/updatereleaseack",
  (data) => {
    let req = { type: "update_release_ack", data: data }; 
    return socket.post(req);
  }
);
export const loadReleaseMSGTemp = createAsyncThunk(
  "stackrelease/loadreleasemsgtemp",
  () => {
    let req = { type: "get_msg_template", data: {} }; 
    return socket.post(req);
  }
);

const stackReleaseSlice = createSlice({
  name: "stackrelease",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      } 
    },
    tempLoader: (state) => {
      if ( state.tempLoading != "idle"
      ) {
        state.tempLoading = "idle";
      } 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadReleaselInfoInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadReleaselInfoInit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.release_info;
    });

    builder.addCase(loadReleaselInfoInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadReleaselInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadReleaselInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.release_info;
    });

    builder.addCase(loadReleaselInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateReleaseAck.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateReleaseAck.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateReleaseAck.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });


      builder.addCase(loadReleaseMSGTemp.pending, (state) => {
        state.tempLoading = "pending";
      });
  
      builder.addCase(loadReleaseMSGTemp.fulfilled, (state, action) => {
        state.tempLoading = "succeeded";
        state.tempList = action.payload.data.msg_template;
      });
  
      builder.addCase(loadReleaseMSGTemp.rejected, (state, action) => {
        state.tempLoading = action.error.name;
        state.msg = action.error.message;
      });

    
  },
});

export default stackReleaseSlice.reducer;
export const { initLoader, tempLoader } = stackReleaseSlice.actions;
