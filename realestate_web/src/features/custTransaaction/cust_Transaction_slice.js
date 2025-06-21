import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  custlist: [],
  tranHist:{},
  msg: "",
};

export const loadCustTransactionConfig = createAsyncThunk(
  "custtransfer/loadConfig",
  () => {
    let req = { type: "get_cust_sub_project_name_list", data: {} }; 
    return socket.post(req);
  }
);
export const submitCustTransaction = createAsyncThunk(
  "custtransfer/NewConfig",
  (data) => {
    let req = { type: "get_cust_tran_summary", data: data }; 
    return socket.post(req);
  }
);


const custTransactionSlice = createSlice({
  name: "custtransfer",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (  state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      }
    },
    initTranHist: (state) => {
      state.tranHist={};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCustTransactionConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadCustTransactionConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.custlist = action.payload.data.sub_project_name;
    });

    builder.addCase(loadCustTransactionConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitCustTransaction.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(submitCustTransaction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.tranHist = action.payload.data;
      });
  
      builder.addCase(submitCustTransaction.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });


  },
});

export default custTransactionSlice.reducer;
export const { initLoader,initTranHist } = custTransactionSlice.actions;
