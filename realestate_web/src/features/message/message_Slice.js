import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  list: [],
  msg: "",
};

export const loadMessageConfig = createAsyncThunk(
  "message/loadMessage",
  () => {
    let req = { type: "get_msg_template", data: {} }; 
    return socket.post(req);
  }
);

export const updateMessageConfig = createAsyncThunk(
  "message/updateMessage",
  (data) => {
    let req = { type: "update_msg_template", data: data }; 
    return socket.post(req);
  }
);

export const saveMessageConfig = createAsyncThunk(
  "message/saveMessage",
  (data) => {
    let req = { type: "save_msg_template", data: data }; 
    return socket.post(req);
  }
);

export const deleteMessageConfig = createAsyncThunk(
  "message/deleteMessage",
  (data) => {
    let req = { type: "delete_msg_template", data: data }; 
    return socket.post(req);
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMessageConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadMessageConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.msg_template;
    });

    builder.addCase(loadMessageConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateMessageConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateMessageConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateMessageConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveMessageConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveMessageConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveMessageConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteMessageConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteMessageConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteMessageConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default messageSlice.reducer;
export const { initLoader } = messageSlice.actions;
