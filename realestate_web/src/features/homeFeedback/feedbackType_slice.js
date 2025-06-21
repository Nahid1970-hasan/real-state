import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  msg: ''
};

export const loadFeedback = createAsyncThunk("feedbackType/loadFeedback", () => {
  
  let req = { type: "get_public_feedback", data: {} };
  //console.log(req);
  return socket.post_home(req);
});

const feedbackType = createSlice({
  name: "feedbackType",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadFeedback.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadFeedback.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload)
      state.list = action.payload.data;
    });

    builder.addCase(loadFeedback.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default feedbackType.reducer;
