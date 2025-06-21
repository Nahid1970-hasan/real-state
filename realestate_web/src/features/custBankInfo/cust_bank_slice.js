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


export const loadCustBankInfo = createAsyncThunk(
    "custBankInfo/loadConfig",
    () => {
      let req = { type: "get_cust_bank_info", data: {} }; 
      return socket.post(req);
    }
  );

  export const saveCustBankInfo = createAsyncThunk(
    "custBankInfo/saveConfig",
    (data) => {
      let req = { type: "save_cust_bank_info", data: data }; 
      return socket.post(req);
    }
  );

  export const updateCustBankInfo = createAsyncThunk(
    "custBankInfo/updateConfig",
    (data) => {
      let req = { type: "update_cust_bank_info", data: data };
      return socket.post(req);
    }
  );

  export const deleteCustBankInfo = createAsyncThunk(
    "custBankInfo/deleteConfig",
    (data) => {
      let req = { type: "delete_cust_bank_info", data: data };
      return socket.post(req);
    }
  );




const custBankInfoSlice = createSlice({
  name: "custBankInfo",
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
    builder.addCase(loadCustBankInfo.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadCustBankInfo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.list = action.payload.data.own_banks;
      });
  
      builder.addCase(loadCustBankInfo.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });

    builder.addCase(saveCustBankInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(saveCustBankInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(saveCustBankInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
      builder.addCase(updateCustBankInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateCustBankInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(updateCustBankInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      })

      builder.addCase(deleteCustBankInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(deleteCustBankInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(deleteCustBankInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });

 
  },
});

export default custBankInfoSlice.reducer;
export const { initLoader } = custBankInfoSlice.actions;
