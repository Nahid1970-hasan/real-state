import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  profitAmount: 0,
  investlist:[],
  projectlist:[],
  availableAmount:0, 
  msg: "",
};

export const loadInvWithdrawlConfig = createAsyncThunk(
  "invwithdrawl/loadConfig",
  () => {
    let req = { type: "get_inv_withdrawl_info", data: {} }; 
    return socket.post(req);
  }
);
export const loadNewWithdrawl = createAsyncThunk(
  "invwithdrawl/NewConfig",
  () => {
    let req = { type: "get_project_name_list_completed", data: {} }; 
    return socket.post(req);
  }
);
export const submitWithdrawlConfig = createAsyncThunk(
  "invwithdrawl/submitConfig",
  (data) => {
    let req = { type: "get_inv_investment_info", data: data }; 
    return socket.post(req);
  }
);

export const updateInvWithdrawlConfig = createAsyncThunk(
  "invwithdrawl/updateConfig",
  (data) => {
    let req = { type: "update_inv_withdrawl_info", data: data }; 
    return socket.post(req);
  }
);


export const saveInvWithdrawlConfig = createAsyncThunk(
  "invwithdrawl/saveConfig",
  (data) => {
    let req = { type: "save_inv_withdrawl_info", data: data };
    
    return socket.post(req);
  }
);

export const deleteInvWithdrawlConfig = createAsyncThunk(
  "invwithdrawl/deleteConfig",
  (data) => {
    let req = { type: "delete_inv_withdrawl_info", data: data };
    
    return socket.post(req);
  }
);
export const acknowledgeWithdawlInfo = createAsyncThunk(
    "invwithdrawl/acknowledge",
    (data) => {
      let req = { type: "post_inv_withdrawl_info", data: data };
     
      return socket.post(req);
    }
  );

const invwithdrawlSlice = createSlice({
  name: "invwithdrawl",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle"   ) {
        state.addUpdateLoading = "idle";
      }
    }, 
    investRefresh: (state, action) => {
      state.investlist=[];
      state.availableAmount=0;
      state.profitAmount=0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvWithdrawlConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvWithdrawlConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.withdrawl_info;
    });

    builder.addCase(loadInvWithdrawlConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadNewWithdrawl.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadNewWithdrawl.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.projectlist = action.payload.data.project_name;
    });

    builder.addCase(loadNewWithdrawl.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitWithdrawlConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(submitWithdrawlConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.investlist = action.payload.data.investment_info;
      state.profitAmount =(action.payload.data.profit_amount||0) -((action.payload.data.profit_withdrawl_amount||0)+(action.payload.data.profit_release_amount||0));
      state.availableAmount = (action.payload.data.inv_withdrawl_amount||0)+(action.payload.data.inv_release_amount||0); 
    });

    builder.addCase(submitWithdrawlConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateInvWithdrawlConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateInvWithdrawlConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateInvWithdrawlConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveInvWithdrawlConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveInvWithdrawlConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveInvWithdrawlConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteInvWithdrawlConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteInvWithdrawlConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteInvWithdrawlConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(acknowledgeWithdawlInfo.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(acknowledgeWithdawlInfo.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(acknowledgeWithdawlInfo.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
  },
});

export default invwithdrawlSlice.reducer;
export const { initLoader, investRefresh } = invwithdrawlSlice.actions;
