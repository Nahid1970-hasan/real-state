import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  msg: ''
};

export const loadDistrict = createAsyncThunk("district/loadDistrict", () => {
  
  let req = { type: "get_all_district_list", data: {} };
  return socket.post(req);
});

const districtSlice = createSlice({
  name: "district",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadDistrict.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadDistrict.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.district_list;
    });

    builder.addCase(loadDistrict.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default districtSlice.reducer;
