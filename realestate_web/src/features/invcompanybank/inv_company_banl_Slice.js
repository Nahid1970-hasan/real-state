import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  addUpdateLoading: "idle",
  list: [],
  msg: "",
};

export const loadInvBankInfoConfig = createAsyncThunk(
  "invcompbankinfo/loadConfig",
  () => {
    let req = { type: "get_company_bank_info", data: {} }; 
    return socket.post(req);
  }
);




const invbankInfoSlice = createSlice({
  name: "invcompbankinfo",
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
    builder.addCase(loadInvBankInfoConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvBankInfoConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.company_banks;
    });

    builder.addCase(loadInvBankInfoConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

   
  },
});

export default invbankInfoSlice.reducer;
export const { initLoader } = invbankInfoSlice.actions;
