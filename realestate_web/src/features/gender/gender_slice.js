import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  statusList: [],
  msg: ''
};

export const loadGender = createAsyncThunk("gender/loadGender", () => {
  
  let req = { type: "get_gender_list", data: {} };
  console.count(JSON.stringify(req));
  return socket.post(req);
});

const genderSlice = createSlice({
  name: "gender",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadGender.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadGender.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.gender_list;
      state.statusList = action.payload.data.status_list;
    });

    builder.addCase(loadGender.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default genderSlice.reducer;
