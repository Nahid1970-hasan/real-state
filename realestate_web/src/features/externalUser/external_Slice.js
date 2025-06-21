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

export const loadUserConfig = createAsyncThunk(
  "external/loadConfig",
  () => {
    let req = { type: "get_external_users_init", data: {} };
    //console.log(req);
    return socket.post(req);
  }
);

export const updateUserConfig = createAsyncThunk(
  "external/updateConfig",
  (data) => {
    let req = { type: "update_external_user", data: data };
    //console.log(req);
    return socket.post(req);
  }
);

export const submitExternalConfig = createAsyncThunk(
  "external/submitConfig",
  (data) => {
    let req = { type: "get_external_users", data: data };
    //console.log(req);
    return socket.post(req);
  }
);



const ExternalConfigSlice = createSlice({
  name: "external",
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
    builder.addCase(loadUserConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadUserConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.external_users;
    });

    builder.addCase(loadUserConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateUserConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateUserConfig.fulfilled, (state, action) => {
      console.log(action)
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;

     
    });

    builder.addCase(updateUserConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(submitExternalConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(submitExternalConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.external_users;
    });

    builder.addCase(submitExternalConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    
  },
});

export default ExternalConfigSlice.reducer;
export const { initLoader } = ExternalConfigSlice.actions;
