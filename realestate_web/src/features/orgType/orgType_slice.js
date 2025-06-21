import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  msg: ''
};

export const loadOrg = createAsyncThunk("Orgtype/loadOrg", () => {
  
  let req = { type: "get_orgtype_list", data: {} };
  //console.log(req);
  return socket.post(req);
});

const orgtypeSlice = createSlice({
  name: "orgtype",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadOrg.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadOrg.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.org_type_list;
    });

    builder.addCase(loadOrg.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default orgtypeSlice.reducer;
