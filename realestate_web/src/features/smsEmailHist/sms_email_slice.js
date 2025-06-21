import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  emaillist:[],
 smslist: [],
  msg: "",
};

export const loadSMSEmailConfig = createAsyncThunk(
  "smshistory/loadConfig",
  () => {
    let req = { type: "get_sms_email_hist_init", data: {} };
  
    return socket.post(req);
  }
);
export const SubmitHistory = createAsyncThunk(
    "smshistory/loadpaymentinfo",
    (data) => {
      let req = { type: "get_sms_email_hist", data: data }; 
      return socket.post(req);
    }
  );



const smsConfigSlice = createSlice({
  name: "smshistory",
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
    builder.addCase(loadSMSEmailConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadSMSEmailConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.smslist = action.payload.data.sms_hist;
      state.emaillist = action.payload.data.email_hist;
    });

    builder.addCase(loadSMSEmailConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(SubmitHistory.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(SubmitHistory.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.smslist = action.payload.data.sms_hist;
        state.emaillist = action.payload.data.email_hist;
      });
  
      builder.addCase(SubmitHistory.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });

    
  },
});

export default smsConfigSlice.reducer;
export const { initLoader } = smsConfigSlice.actions;
