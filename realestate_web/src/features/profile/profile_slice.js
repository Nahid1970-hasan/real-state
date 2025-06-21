import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  user: {},
  loading: "idle",
  updateLoading: "idle",
  msg: "",
};

export const loadProfile = createAsyncThunk("self/self", () => {
  return socket.post({ type: "get_user_profile_self", data: {} });
});

export const updateProfile = createAsyncThunk("self/update", (data) => {
  return socket.post({ type: "update_user_profile_self", data:data });
});

const profileSlice = createSlice({
  initialState,
  name: "self",
  reducers: {
    initLoader: (state) => {
      state.updateLoading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadProfile.fulfilled, (state, action) => {
      state.loading = "successed";
      state.user = action.payload.data;
    });
    builder.addCase(loadProfile.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateProfile.pending, (state, action) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateProfile.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default profileSlice.reducer;
export const { initLoader } = profileSlice.actions;
