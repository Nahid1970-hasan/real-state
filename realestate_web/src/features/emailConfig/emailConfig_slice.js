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

export const loadEmailConfig = createAsyncThunk(
  "emailConfig/loadConfig",
  () => {
    let req = { type: "get_email_config", data: {} }; 
    return socket.post(req);
  }
);

export const undateEmailConfig = createAsyncThunk(
  "emailConfig/updateConfig",
  (data) => {
    let req = { type: "update_email_config", data: data }; 
    return socket.post(req);
  }
);

export const saveEmailConfig = createAsyncThunk(
  "emailConfig/saveConfig",
  (data) => {
    let req = { type: "save_email_config", data: data }; 
    return socket.post(req);
  }
);

export const deleteEmailConfig = createAsyncThunk(
  "emailConfig/deleteConfig",
  (data) => {
    let req = { type: "delete_email_config", data: data }; 
    return socket.post(req);
  }
);

const emailConfigSlice = createSlice({
  name: "emailConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadEmailConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadEmailConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.email_config;
    });

    builder.addCase(loadEmailConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(undateEmailConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(undateEmailConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(undateEmailConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveEmailConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveEmailConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveEmailConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteEmailConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteEmailConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteEmailConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default emailConfigSlice.reducer;
export const { initLoader } = emailConfigSlice.actions;
