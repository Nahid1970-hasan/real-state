import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  msg: "",
  Companylist:[],
  Ownerlist:[],

};

export const loadCustPaymentInfo = createAsyncThunk(
  "custpayment/loadpaymentinfo",
  () => {
    let req = { type: "get_cust_payment_info", data: {} };
    return socket.post(req);
  }
);
export const loadNewCustPayment = createAsyncThunk(
  "custpayment/loadnewpayment",
  () => {
    let req = { type: "get_cust_pmt_ref_data", data: {} };
    return socket.post(req);
  }
);

export const updateviewpayment = createAsyncThunk(
  "custpayment/updateConfig",
  (data) => {
    let req = { type: "update_cust_payment_info", data: data };
    return socket.post(req);
  }
);

export const saveviewpayment = createAsyncThunk(
  "custpayment/saveConfig",
  (data) => {
    let req = { type: "save_cust_payment_info", data: data };
    return socket.post(req);
  }
);

export const deleteviewpayment = createAsyncThunk(
  "custpayment/deleteConfig",
  (data) => {
    let req = { type: "delete_cust_payment_info", data: data };
    return socket.post(req);
  }
);
export const submitCustAcknowledge = createAsyncThunk(
    "custpayment/updateacknowledge",
    (data) => {
      let req = { type: "post_cust_payment_info", data: data };
      return socket.post(req);
    }
  );

const custPaymentSlice = createSlice({
  name: "custpayment",
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
    builder.addCase(loadCustPaymentInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadCustPaymentInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.cust_payment_info;
    });

    builder.addCase(loadCustPaymentInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadNewCustPayment.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadNewCustPayment.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.Companylist = action.payload.data.com_banks;
      state.Ownerlist = action.payload.data.own_banks;
      state.projectlist = action.payload.data.sub_project_name_list;
    });

    builder.addCase(loadNewCustPayment.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateviewpayment.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateviewpayment.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateviewpayment.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveviewpayment.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveviewpayment.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveviewpayment.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteviewpayment.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteviewpayment.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteviewpayment.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitCustAcknowledge.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(submitCustAcknowledge.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(submitCustAcknowledge.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
  },
});

export default custPaymentSlice.reducer;
export const { initLoader } = custPaymentSlice.actions;
