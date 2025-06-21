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

export const loadInvestmentConfig = createAsyncThunk(
  "investment/loadConfig",
  (data) => {
    let req = { type: "get_inv_investment_info", data: data }; 
    return socket.post(req);
  }
);
export const loadNewInvestment = createAsyncThunk(
  "investment/NewConfig",
  () => {
    let req = { type: "get_project_name_list_running", data: {} }; 
    return socket.post(req);
  }
);
export const InvSubmit = createAsyncThunk(
  "investment/submitConfig",
  (data) => {
    let req = { type: "get_project_info", data: data }; 
    return socket.post(req);
  }
);

export const updateInvestmentConfig = createAsyncThunk(
  "investment/updateConfig",
  (data) => {
    let req = { type: "update_inv_investment_info", data: data }; 
    return socket.post(req);
  }
);

export const saveInvestmentConfig = createAsyncThunk(
  "investment/saveConfig",
  (data) => {
    let req = { type: "save_inv_investment_info", data: data }; 
    return socket.post(req);
  }
);

export const DeleteInvestmentConfig = createAsyncThunk(
  "investment/deleteConfig",
  (data) => {
    let req = { type: "delete_inv_investment_info", data: data }; 
    return socket.post(req);
  }
);
export const submitInvestmentAcknowledge = createAsyncThunk(
    "investment/updateacknowledge",
    (data) => {
      let req = { type: "post_inv_investment_info", data: data }; 
      return socket.post(req);
    }
  );

const investmentSlice = createSlice({
  name: "investment",
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
    invRefresh: (state, action) => {
      state.Invlist={}; 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvestmentConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvestmentConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.investment_info;
      state.walletAmount = action.payload.data.wallet_amount||0;
    });

    builder.addCase(loadInvestmentConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadNewInvestment.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadNewInvestment.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.projectlist = action.payload.data.project_name; 
    });

    builder.addCase(loadNewInvestment.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(InvSubmit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(InvSubmit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.Invlist = action.payload.data.project_info;
    });

    builder.addCase(InvSubmit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateInvestmentConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateInvestmentConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateInvestmentConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveInvestmentConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveInvestmentConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveInvestmentConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(DeleteInvestmentConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(DeleteInvestmentConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(DeleteInvestmentConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitInvestmentAcknowledge.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(submitInvestmentAcknowledge.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(submitInvestmentAcknowledge.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
  },
});

export default investmentSlice.reducer;
export const { initLoader, initRefresh, invRefresh } = investmentSlice.actions;
