import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  Invlist:{},
  projectlist:[],
  walletAmount:0,
  msg: "",
};

export const loadAdminInvInfo = createAsyncThunk(
  "adminInv/loadConfig",
  (data) => {
    let req = { type: "get_com_investment_info_init", data: data }; 
    return socket.post(req);
  }
);
export const loadAdminInv = createAsyncThunk("adminInv/loadInvInfo", (data) => {
  let req = { type: "get_com_investment_info", data: data };

  return socket.post(req);
});
export const loadNewAdminInv = createAsyncThunk(
  "adminInv/NewConfig",
  () => {
    let req = { type: "get_project_name_list_running", data: {} }; 
    return socket.post(req);
  }
);
export const AdminInvSubmit = createAsyncThunk(
  "adminInv/submitConfig",
  (data) => {
    let req = { type: "get_project_info", data: data }; 
    return socket.post(req);
  }
);

export const updateAdminInvInfo = createAsyncThunk(
  "adminInv/updateConfig",
  (data) => {
    let req = { type: "update_com_investment_info", data: data }; 
    return socket.post(req);
  }
);

export const saveAdminInvInfo = createAsyncThunk(
  "adminInv/saveConfig",
  (data) => {
    let req = { type: "save_com_investment_info", data: data }; 
    return socket.post(req);
  }
);

export const deleteAdminInvInfo = createAsyncThunk(
  "adminInv/deleteConfig",
  (data) => {
    let req = { type: "delete_com_investment_info", data: data }; 
    return socket.post(req);
  }
);
export const submitadminInvAcknowledge = createAsyncThunk(
    "adminInv/updateacknowledge",
    (data) => {
      let req = { type: "post_com_investment_info", data: data }; 
      return socket.post(req);
    }
  );
  export const submitAdminWallet = createAsyncThunk(
    "adminInv/updateWallet",
    (data) => {
      let req = { type: "update_com_investment_ack", data: data }; 
      return socket.post(req);
    }
  );

const adminInvSlice = createSlice({
  name: "adminInv",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (  state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      }
    },
    initRefresh: (state) => {
      if ( state.loading != "idle" ) {
        state.loading = "idle";
      }
    },
    adminRefresh: (state, action) => {
      state.Invlist={}; 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAdminInvInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdminInvInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.investment_info;
      state.walletAmount = action.payload.data.wallet_amount||0;
    });

    builder.addCase(loadAdminInvInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadAdminInv.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdminInv.fulfilled, (state, action) => {
      state.loading = "succeeded"; 
      state.list = action.payload.data.feedback; 
    });

    builder.addCase(loadAdminInv.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadNewAdminInv.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadNewAdminInv.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.projectlist = action.payload.data.project_name; 
    });

    builder.addCase(loadNewAdminInv.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(AdminInvSubmit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(AdminInvSubmit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.Invlist = action.payload.data.project_info;
    });

    builder.addCase(AdminInvSubmit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateAdminInvInfo.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateAdminInvInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateAdminInvInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveAdminInvInfo.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveAdminInvInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveAdminInvInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteAdminInvInfo.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteAdminInvInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteAdminInvInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitadminInvAcknowledge.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(submitadminInvAcknowledge.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(submitadminInvAcknowledge.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });

      builder.addCase(submitAdminWallet.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(submitAdminWallet.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(submitAdminWallet.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
  },
});

export default adminInvSlice.reducer;
export const { initLoader, initRefresh, adminRefresh } = adminInvSlice.actions;
