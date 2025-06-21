import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  companyBanks:[],
  msg: "",
};


export const loadBankInfo = createAsyncThunk(
    "bankInfo/loadConfig",
    () => {
      let req = { type: "get_company_bank_info", data: {} }; 
      return socket.post(req);
    }
  );

  export const saveBankInfo = createAsyncThunk(
    "bankInfo/saveConfig",
    (data) => {
      let req = { type: "save_company_bank_info", data: data }; 
      return socket.post(req);
    }
  );

  export const updateBankInfo = createAsyncThunk(
    "bankInfo/updateConfig",
    (data) => {
      let req = { type: "update_company_bank_info", data: data };
      return socket.post(req);
    }
  );

  export const deleteBankConfig = createAsyncThunk(
    "bankInfo/deleteConfig",
    (data) => {
      let req = { type: "delete_company_bank_info", data: data };
      return socket.post(req);
    }
  );




const bankInfoSlice = createSlice({
  name: "bankInfo",
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
    builder.addCase(loadBankInfo.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBankInfo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.list = action.payload.data.company_banks;
      });
  
      builder.addCase(loadBankInfo.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });

    builder.addCase(saveBankInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(saveBankInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(saveBankInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
      builder.addCase(updateBankInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateBankInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(updateBankInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      })

      builder.addCase(deleteBankConfig.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(deleteBankConfig.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(deleteBankConfig.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });

 
  },
});

export default bankInfoSlice.reducer;
export const { initLoader } = bankInfoSlice.actions;
