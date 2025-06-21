import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  msg: "",
};

export const loadSMSConfig = createAsyncThunk(
  "smsConfig/loadConfig",
  () => {
    let req = { type: "get_sms_config", data: {} };
  
    return socket.post(req);
  }
);

export const undateSMSConfig = createAsyncThunk(
  "smsConfig/updateConfig",
  (data) => {
    let req = { type: "update_sms_config", data: data };
   
    return socket.post(req);
  }
);

export const saveSMSConfig = createAsyncThunk(
  "smsConfig/saveConfig",
  (data) => {
    let req = { type: "save_sms_config", data: data };
   
    return socket.post(req);
  }
);

export const deleteSMSConfig = createAsyncThunk(
  "smsConfig/deleteConfig",
  (data) => {
    let req = { type: "delete_sms_config", data: data };
    
    return socket.post(req);
  }
);

const smsConfigSlice = createSlice({
  name: "smsConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.addUpdateLoading == "succeeded" ||
        state.addUpdateLoading == "failed"
      ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSMSConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSMSConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.sms_config;
    });

    builder.addCase(loadSMSConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(undateSMSConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(undateSMSConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(undateSMSConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveSMSConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveSMSConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveSMSConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteSMSConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteSMSConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteSMSConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default smsConfigSlice.reducer;
export const { initLoader } = smsConfigSlice.actions;
