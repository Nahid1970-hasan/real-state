import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

const initialState = {
  user: {},
  loading: "idle",
  updateLoading: "idle",
  msg: "",
};

export const loadCustProfile = createAsyncThunk("self/self", () => {
  return socket.post({ type: "get_sh_detail", data: {} });
});

export const updateCustProfile = createAsyncThunk("self/update", (data) => {
  return socket.post({ type: "update_sh_profile", data:data });
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
    builder.addCase(loadCustProfile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loadCustProfile.fulfilled, (state, action) => {
      state.loading = "successed";
      state.user = action.payload.data.inv_detail;
    });
    builder.addCase(loadCustProfile.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateCustProfile.pending, (state) => {
      state.updateLoading = "pending";
    });

    builder.addCase(updateCustProfile.fulfilled, (state, action) => {
      state.updateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateCustProfile.rejected, (state, action) => {
      state.updateLoading = action.error.name;
      state.msg = action.error.message;
    });
  },
});

export default profileSlice.reducer;
export const { initLoader } = profileSlice.actions;
