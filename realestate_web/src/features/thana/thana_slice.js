import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  msg: ''
};

export const loadThana = createAsyncThunk("thana/loadThana", (data) => {

  let req = { type: "get_selected_thana_list", data: data };
  //console.log(req);
  return socket.post(req);
});

const thanaSlice = createSlice({
  name: "thana",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadThana.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadThana.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = "succeeded";
      state.list = action.payload.data.thana_list;
    });

    builder.addCase(loadThana.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default thanaSlice.reducer;
