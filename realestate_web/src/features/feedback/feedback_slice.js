import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    list: [],
    feedlist:[],
    replyloading:"idle",
    msg: ''
  };
  export const loadFeedbackData = createAsyncThunk("feedback/feedbackload", () => {
    let req = { type: "get_feedback_list_init", data: {} };

    return socket.post(req);
  });
  export const loadFeedback = createAsyncThunk("feedback/feedload", (data) => {
    let req = { type: "get_feedback_list", data: data };

    return socket.post(req);
  });

  export const updateFeedbackData = createAsyncThunk("feedback/feedbackupdate", (data) => {
    let req = { type: "update_feedback", data: data }; 
    return socket.post(req);
  });


  const loadFeedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
      initLoader: (state) => {
        if (state.replyloading != "idle") {
          state.replyloading = "idle";
        } 
      },
    },
    extraReducers: (builder) => {
      builder.addCase(loadFeedbackData.pending, (state) => {
        state.loading = "pending";
      });

  
      builder.addCase(loadFeedbackData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.list = action.payload.data.feedback; 
      });
  
      builder.addCase(loadFeedbackData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });

      builder.addCase(loadFeedback.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadFeedback.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.list = action.payload.data.feedback; 
      });
  
      builder.addCase(loadFeedback.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });

      builder.addCase(updateFeedbackData.pending, (state) => {
        state.replyloading = "pending";
      });
  
      builder.addCase(updateFeedbackData.fulfilled, (state, action) => {
        state.replyloading = "succeeded";
        state.msg = action.payload.data.msg; 
      });
  
      builder.addCase(updateFeedbackData.rejected, (state, action) => {
        state.replyloading = action.error.name;
        state.msg = action.error.message;
      });
    },
  });

  export default loadFeedbackSlice.reducer;
  export const { initLoader } = loadFeedbackSlice.actions;