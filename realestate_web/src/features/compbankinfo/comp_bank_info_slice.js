import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle",
  list: [],
  msg: "",
};

export const loadBankInfoConfig = createAsyncThunk(
  "compbankinfo/loadConfig",
  () => {
    let req = { type: "get_company_bank_info", data: {} };
    return socket.post(req);
  }
);




const bankInfoSlice = createSlice({
  name: "compbankinfo",
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
    builder.addCase(loadBankInfoConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBankInfoConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.company_banks;
    });

    builder.addCase(loadBankInfoConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

   
  },
});

export default bankInfoSlice.reducer;
export const { initLoader } = bankInfoSlice.actions;
