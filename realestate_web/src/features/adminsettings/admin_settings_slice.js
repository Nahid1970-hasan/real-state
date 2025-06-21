import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle", 
  list: [],
  msg: "",
};

export const loadAdminSetting = createAsyncThunk(
  "adminSettings/loadAdmin",
  () => {
    let req = { type: "get_admin_settings", data: {} }; 
    return socket.post(req);
  }
);

export const saveAdminSettingsData = createAsyncThunk(
  "adminSettings/saveAdminSettings",
  (data) => {
    let req = { type: "save_admin_settings", data: data }; 
    return socket.post(req);
  }
);
 

const adminSettingsSlice = createSlice({
  name: "adminSettings",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdminSetting.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdminSetting.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.admin_settings;
    });

    builder.addCase(loadAdminSetting.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveAdminSettingsData.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveAdminSettingsData.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveAdminSettingsData.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export default adminSettingsSlice.reducer;
export const { initLoader } = adminSettingsSlice.actions;
