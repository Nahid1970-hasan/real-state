import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",   
  msg: "",
};

export const getValidateEmail = createAsyncThunk(
  "forgetPassword/activateEmail",
  (data) => {
    let req = { type: "activate_account", data: data };
    console.log(req);
    return socket.post(req);
  }
); 

const validateEmailSlice = createSlice({
  name: "smsConfig",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.loading == "succeeded" ||
        state.loading == "failed"
      ) {
        state.loading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getValidateEmail.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getValidateEmail.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(getValidateEmail.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    }); 
  },
});

export default validateEmailSlice.reducer;
export const { initLoader } = validateEmailSlice.actions;
