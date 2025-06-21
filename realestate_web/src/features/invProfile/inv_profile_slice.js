import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  user: {},
  loading: "idle",
  updateLoading: "idle",
  msg: "",
};

export const loadInvProfile = createAsyncThunk("invprofile/self", () => {
  return socket.post({ type: "get_sh_detail", data:{} });
});

export const updateProfile = createAsyncThunk("invprofile/update", (data) => {
  return socket.post({ type: "update_sh_profile", data });
});

const profileSlice = createSlice({
  initialState,
  name: "invprofile",
  reducers: {
    initLoader: (state) => {
      state.updateLoading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadInvProfile.fulfilled, (state, action) => {
      state.loading = "successed";
      state.user = action.payload.data.inv_detail;

    });
    builder.addCase(loadInvProfile.rejected, (state, action) => {
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
