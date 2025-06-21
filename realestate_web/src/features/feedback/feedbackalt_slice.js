import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    list: [],
    replyloading:"idle",
    msg: ''
  };
  export const loadFeedbackAltData = createAsyncThunk("feedback/bmdfeedbackload", (data) => {
    let req = { type: "get_feedback_bmd", data: data };

    return socket.post(req);
  });

  export const updateFeedbackAltData = createAsyncThunk("feedback/bmdfeedbackupdate", (data) => {
    let req = { type: "update_feedback_bmd", data: data };

    return socket.post(req);
  });


  const loadFeedbackAltSlice = createSlice({
    name: "feedBackAlt",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadFeedbackAltData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadFeedbackAltData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.replyloading = "idle";
        state.list = action.payload.data.feedback;
        //console.log(action.payload)
      });
  
      builder.addCase(loadFeedbackAltData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });
      builder.addCase(updateFeedbackAltData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(updateFeedbackAltData.fulfilled, (state, action) => {
        state.replyloading = "succeeded";
        state.msg = action.payload.data.msg;
        //console.log(action.payload)
      });
  
      builder.addCase(updateFeedbackAltData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });
    },
  });

  export default loadFeedbackAltSlice.reducer;