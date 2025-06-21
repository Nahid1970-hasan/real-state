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

export const loadfaqConfig = createAsyncThunk(
  "faqConfig/loadConfig",
  () => {
    let req = { type: "get_faq_list", data: {} };
    console.log(req);
    return socket.post(req);
  }
);

export const updatefaqConfig = createAsyncThunk(
  "faqConfig/updateConfig",
  (data) => {
    let req = { type: "update_faq", data: data };
    console.log(req);
    return socket.post(req);
  }
);

export const savefaqConfig = createAsyncThunk(
  "faqConfig/saveConfig",
  (data) => {
    let req = { type: "save_faq", data: data };
    console.log(req);
    return socket.post(req);
  }
);

export const deletefaqConfig = createAsyncThunk(
  "faqConfig/deleteConfig",
  (data) => {
    let req = { type: "delete_faq", data: data };
    console.log(req);
    return socket.post(req);
  }
);

const faqConfigSlice = createSlice({
  name: "faqConfig",
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
    builder.addCase(loadfaqConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadfaqConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.faq_list;
    });

    builder.addCase(loadfaqConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updatefaqConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updatefaqConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updatefaqConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(savefaqConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(savefaqConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(savefaqConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deletefaqConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deletefaqConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deletefaqConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default faqConfigSlice.reducer;
export const { initLoader } = faqConfigSlice.actions;
