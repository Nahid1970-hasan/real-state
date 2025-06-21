import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  msg: ''
};

export const loadRequestType = createAsyncThunk("requestType/loadRequestType", () => {

  let req = { type: "get_feedbacktype_list", data: {} };
  return socket.post(req);
});

const requestTypeSlice = createSlice({
  name: "requestType",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadRequestType.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadRequestType.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.feedbacktype_list;
      //console.log(action.payload)
    });

    builder.addCase(loadRequestType.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default requestTypeSlice.reducer;
