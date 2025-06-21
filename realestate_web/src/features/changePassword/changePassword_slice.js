import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
};

export const changePasswordEdit = createAsyncThunk(
  "changePassword/updatePassword",
  (data) => {
    let req = { type: "change_password", data: data };
    //console.log(req);
    return socket.post(req);
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    initLoader: (state) => {
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changePasswordEdit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(changePasswordEdit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.msg = action.payload.data.msg;
      localStorage.setItem("session_key", action.payload.data.session_key);
    });

    builder.addCase(changePasswordEdit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default changePasswordSlice.reducer;
export const { initLoader } = changePasswordSlice.actions;
