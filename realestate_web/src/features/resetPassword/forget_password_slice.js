import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",   
  msg: "",
};

export const getPassResetLink = createAsyncThunk(
  "forgetPassword/resetLink",
  (data) => {
    let req = { type: "get_password_reset_link", data: data }; 
    return socket.post(req);
  }
); 

const forgetPasswordSlice = createSlice({
  name: "smsConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.loading != "idle"  ) {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPassResetLink.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getPassResetLink.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(getPassResetLink.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export default forgetPasswordSlice.reducer;
export const { initLoader } = forgetPasswordSlice.actions;
