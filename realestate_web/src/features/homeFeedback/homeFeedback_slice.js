import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  updateLoading: "idle",
  addLoading: "idle",
  msg: "",
};

export const loadFeedback = createAsyncThunk("feedback/loadFeedback", () => {
  let req = { type: "get_feedback_list_init_pub", data: {} };
  return socket.post(req);
});


export const saveHomeFeedback = createAsyncThunk("feedback/saveFeedback", (data) => {

  let req = { type: "save_feedback_pub", data: data };

  return socket.post(req);
});

export const searchHomeFeedback = createAsyncThunk("feedback/searchFeedback", (data) => {

  let req = { type: "get_feedback_list_pub", data: data };

  return socket.post(req);
});


export const editHomeFeedback = createAsyncThunk("feedback/editfeedback", (data) => { 
  let req = { type: "", data: data }; 
  return socket.post(req);
});



export const deleteHomeFeedback = createAsyncThunk("feedback/deletefeedback", (data) => {
  let req = { type: "", data: data };

  return socket.post_home(req);
});

const homeFeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.updateLoading == "succeeded" ||
        state.updateLoading == "failed"
      ) {
        state.updateLoading = "idle";
      }
      if (
        state.addLoading == "succeeded" ||
        state.addLoading == "failed"
      ) {
        state.addLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {

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

    builder.addCase(saveHomeFeedback.pending, (state, action) => {
      state.addLoading = "pending"
    });

    builder.addCase(saveHomeFeedback.fulfilled, (state, action) => {

      console.log(action.payload)
      state.addLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveHomeFeedback.rejected, (state, action) => {
      state.addLoading = action.error.name;
      state.msg = action.error.message
    });


    builder.addCase(searchHomeFeedback.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(searchHomeFeedback.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.feedback; 
    });

    builder.addCase(searchHomeFeedback.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });



  },
});

export default homeFeedbackSlice.reducer;
export const { initLoader } = homeFeedbackSlice.actions;
