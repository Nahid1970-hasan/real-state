import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  tempLoading: "idle",
  addUpdateLoading: "idle", 
  list: [],
  templateList:[],
  msg: "",
};

export const loadPaymentInfoInit = createAsyncThunk(
  "stackpayment/loadpaymentinfoInit",
  () => {
    let req = { type: "get_payment_info_init", data: {} }; 
    return socket.post(req);
  }
);

export const loadPaymentInfo = createAsyncThunk(
  "stackpayment/loadpaymentinfo",
  (data) => {
    let req = { type: "get_payment_info", data: data }; 
    return socket.post(req);
  }
);

export const updatePaymentAck = createAsyncThunk(
  "stackpayment/updatepaymentack",
  (data) => {
    let req = { type: "update_payment_ack", data: data };
   
    return socket.post(req);
  }
);

export const updatePayWallet = createAsyncThunk(
  "stackpayment/updatepaywallet",
  (data) => {
    let req = { type: "update_payment_wallet", data: data }; 
    return socket.post(req);
  }
);

export const loadTemplateList = createAsyncThunk(
  "stackpayment/loadTemplateList",
  () => {
    let req = { type: "get_msg_template", data: {} }; 
    return socket.post(req);
  }
);

const stackPaymentSlice = createSlice({
  name: "stackpayment",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle"
      ) {
        state.addUpdateLoading = "idle";
      } 
    },
    tempLoader: (state) => {
      if ( state.tempLoading != "idle"
      ) {
        state.tempLoading = "idle";
      } 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPaymentInfoInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPaymentInfoInit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.payment_info;
    });

    builder.addCase(loadPaymentInfoInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadPaymentInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPaymentInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.payment_info;
    });

    builder.addCase(loadPaymentInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updatePaymentAck.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updatePaymentAck.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updatePaymentAck.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updatePayWallet.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updatePayWallet.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(updatePayWallet.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });

      builder.addCase(loadTemplateList.pending, (state) => {
        state.tempLoading = "pending";
      });
  
      builder.addCase(loadTemplateList.fulfilled, (state, action) => {
        state.tempLoading = "succeeded";
        state.templateList = action.payload.data.msg_template;
      });
  
      builder.addCase(loadTemplateList.rejected, (state, action) => {
        state.tempLoading = action.error.name;
        state.msg = action.error.message;
      });

    
  },
});

export default stackPaymentSlice.reducer;
export const { initLoader, tempLoader } = stackPaymentSlice.actions;
