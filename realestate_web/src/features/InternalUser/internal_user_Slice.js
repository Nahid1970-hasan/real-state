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

export const loadInternalUserConfig = createAsyncThunk(
  "internal/loadConfig",
  () => {
    let req = { type: "get_internal_users_list", data: {} };
    //console.log(req);
    return socket.post(req);
  }
);

export const updateInternalUserConfig = createAsyncThunk(
  "internal/updateConfig",
  (data) => {
    let req = { type: "update_internal_users_info", data: data };
    //console.log(req);
    return socket.post(req);
  }
);

export const saveInternalUserConfig = createAsyncThunk(
  "internal/saveConfig",
  (data) => {
    let req = { type: "save_internal_users_info", data: data };
    //console.log(req);
    return socket.post(req);
  }
);

export const deleteInternalUserConfig = createAsyncThunk(
  "internal/deleteConfig",
  (data) => {
    let req = { type: "delete_internal_users_info", data: data };
    //console.log(req);
    return socket.post(req);
  }
);

const internalUserConfigSlice = createSlice({
  name: "internal",
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
    builder.addCase(loadInternalUserConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInternalUserConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.adm_users;
    });

    builder.addCase(loadInternalUserConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

 
    builder.addCase(updateInternalUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateInternalUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateInternalUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveInternalUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveInternalUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveInternalUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteInternalUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteInternalUserConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteInternalUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default internalUserConfigSlice.reducer;
export const { initLoader } = internalUserConfigSlice.actions;
