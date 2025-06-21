import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",   
  msg: "",
};

export const getResetPassword = createAsyncThunk(
  "forgetPassword/resetPass",
  (data) => {
    let req = { type: "reset_password", data: data };
    console.log(req);
    return socket.post(req);
  }
); 

const resetPasswordSlice = createSlice({
  name: "smsConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.loading != "idle" ) {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getResetPassword.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getResetPassword.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(getResetPassword.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export default resetPasswordSlice.reducer;
export const { initLoader } = resetPasswordSlice.actions;
