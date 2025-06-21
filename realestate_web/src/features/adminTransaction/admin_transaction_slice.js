import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  msg: "",
};

export const loadSummaryConfig = createAsyncThunk(
  "tranctionsummary/loadConfig",
  () => {
    let req = { type: "get_project_name_list", data: {} }; 
    return socket.post(req);
  }
);
export const submitTransaction = createAsyncThunk(
  "tranctionsummary/submitConfig",
  (data) => {
    let req = { type: "get_project_summary", data: data }; 
    return socket.post(req);
  }
);



const transactionSummarySlice = createSlice({
  name: "tranctionsummary",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.addUpdateLoading == "succeeded" ||
        state.addUpdateLoading == "failed"
      ) {
        state.addUpdateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSummaryConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSummaryConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.project_name;
    });

    builder.addCase(loadSummaryConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(submitTransaction.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(submitTransaction.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.transaction_sum;
    });

    builder.addCase(submitTransaction.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });


  },
});

export default transactionSummarySlice.reducer;
export const { initLoader } = transactionSummarySlice.actions;
