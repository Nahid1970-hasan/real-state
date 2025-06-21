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

export const loadRegRequest = createAsyncThunk(
  "regreq/loadConfig",
  () => {
    let req = { type: "get_registration_info", data: {} };
    console.log(req);
    return socket.post(req);
  }
);

export const viewRegestion = createAsyncThunk(
  "regreq/viewConfig",
  (data) => {
    let req = { type: "get_registration_detail", data: data };
    console.log(req);
    return socket.post(req);
  }
);

export const approveReg = createAsyncThunk(
  "regreq/approvereq",
  (data) => {
    let req = { type: "approve_registration", data: data };
    console.log(req);
    return socket.post(req);
  }
);

export const deleteRegReq = createAsyncThunk(
  "regreq/deleteConfig",
  (data) => {
    let req = { type: "delete_registration_info", data: data };
    console.log(req);
    return socket.post(req);
  }
);

const regreqSlice = createSlice({
  name: "regreq",
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
    builder.addCase(loadRegRequest.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadRegRequest.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.email_config;
    });

    builder.addCase(loadRegRequest.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(viewRegestion.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(viewRegestion.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(viewRegestion.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(approveReg.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(approveReg.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(approveReg.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteRegReq.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteRegReq.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteRegReq.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default regreqSlice.reducer;
export const { initLoader } = regreqSlice.actions;
