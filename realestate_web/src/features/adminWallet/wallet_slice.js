import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  projectlist:[],
  walletAmount:0,
  msg: "",

};

export const loadAdminWalletInfo = createAsyncThunk(
  "adminWallet/loadConfig",
  () => {
    let req = { type: "get_com_add_money_info_init", data: {} }; 
    return socket.post(req);
  }
);
export const loadAdminWallet = createAsyncThunk("adminWallet/loadInfo", (data) => {
  let req = { type: "get_com_add_money_info", data: data };

  return socket.post(req);
});

export const updateAdminWallet = createAsyncThunk(
  "adminWallet/updateConfig",
  (data) => {
    let req = { type: "update_com_add_money_info", data: data }; 
    return socket.post(req);
  }
);

export const saveAdminWallet = createAsyncThunk(
  "adminWallet/saveConfig",
  (data) => {
    let req = { type: "save_com_add_money_info", data: data }; 
    return socket.post(req);
  }
);

export const deleteAdminWallet = createAsyncThunk(
  "adminWallet/deleteConfig",
  (data) => {
    let req = { type: "delete_com_add_money_info", data: data }; 
    return socket.post(req);
  }
);
export const submitAckAdminWallet = createAsyncThunk(
    "adminWallet/updateacknowledge",
    (data) => {
      let req = { type: "post_com_add_money_info", data: data }; 
      return socket.post(req);
    }
  );

  export const updateWalletInfo = createAsyncThunk(
    "adminWallet/updatewallet",
    (data) => {
      let req = { type: "update_com_add_wallet", data: data }; 
      return socket.post(req);
    }
  );

const adminWalletSlice = createSlice({
  name: "adminWallet",
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
    // initRefresh: (state) => {
    //   if ( state.loading != "idle" ) {
    //     state.loading = "idle";
    //   }
    // },
    // walletRefresh: (state, action) => {
    //   state.Invlist={}; 
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdminWalletInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdminWalletInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.com_wallet;
      state.walletAmount = action.payload.data.wallet_amount;
    });

    builder.addCase(loadAdminWalletInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadAdminWallet.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdminWallet.fulfilled, (state, action) => {
      state.loading = "succeeded"; 
      state.list = action.payload.data.feedback; 
    });

    builder.addCase(loadAdminWallet.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(updateAdminWallet.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateAdminWallet.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateAdminWallet.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveAdminWallet.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveAdminWallet.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveAdminWallet.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteAdminWallet.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteAdminWallet.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteAdminWallet.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitAckAdminWallet.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(submitAckAdminWallet.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(submitAckAdminWallet.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(updateWalletInfo.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateWalletInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateWalletInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

  },
});

export default adminWalletSlice.reducer;
export const { initLoader } = adminWalletSlice.actions;
