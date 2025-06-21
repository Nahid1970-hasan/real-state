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


export const loadInvBankInfo = createAsyncThunk(
    "invBank/loadConfig",
    () => {
      let req = { type: "get_inv_bank_info", data: {} }; 
      return socket.post(req);
    }
  );

  export const saveInvBankInfo = createAsyncThunk(
    "invBank/saveConfig",
    (data) => {
      let req = { type: "save_inv_bank_info", data: data }; 
      return socket.post(req);
    }
  );

  export const updateInvBankInfo = createAsyncThunk(
    "invBank/updateConfig",
    (data) => {
      let req = { type: "update_inv_bank_info", data: data };
      return socket.post(req);
    }
  );

  export const deleteInvBankInfo = createAsyncThunk(
    "invBank/deleteConfig",
    (data) => {
      let req = { type: "delete_inv_bank_info", data: data };
      return socket.post(req);
    }
  );




const invBankSlice = createSlice({
  name: "invBank",
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
    builder.addCase(loadInvBankInfo.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadInvBankInfo.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.list = action.payload.data.own_banks;
      });
  
      builder.addCase(loadInvBankInfo.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      });

    builder.addCase(saveInvBankInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(saveInvBankInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(saveInvBankInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
      builder.addCase(updateInvBankInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(updateInvBankInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(updateInvBankInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      })

      builder.addCase(deleteInvBankInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(deleteInvBankInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(deleteInvBankInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });

 
  },
});

export default invBankSlice.reducer;
export const { initLoader } = invBankSlice.actions;
