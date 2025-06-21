import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  detailLoading: "idle",
  list: [],
  payList:[],
  investList:[],
  user:{},
  stakeholder_others:{},
  stakeholder_detail:{},
  project_detail:[],
  property_detail:{},
  msg: "",
};

export const loadStakeholderInit = createAsyncThunk(
  "stackholderinfo/loadstacklistinit",
  () => {
    let req = { type: "get_stakeholder_list_init", data:{} };
    return socket.post(req);
  }
);

export const loadStakeholder= createAsyncThunk(
  "stackholderinfo/loadstacklist",
  (data) => {
    let req = { type: "get_stakeholder_list", data };
    return socket.post(req);
  }
);

export const loadStakeholderDetail= createAsyncThunk(
  "stackholderinfo/loaddetail",
  (data) => {
    let req = { type: "get_stakeholder_detail", data };
    return socket.post(req);
  }
);
export const loadStackPayment= createAsyncThunk(
  "stackholderinfo/loadpayment",
  (data) => {
    let req = { type: "get_stakeholder_payment", data };
    return socket.post(req);
  }
);
export const loadStackInvvestmnet= createAsyncThunk(
  "stackholderinfo/loadinvesment",
  (data) => {
    let req = { type: "get_stakeholder_investment", data };
    return socket.post(req);
  }
);
export const loadStackProperty= createAsyncThunk(
  "stackholderinfo/loadproperty",
  (data) => {
    let req = { type: "get_stakeholder_property", data };
    return socket.post(req);
  }
);


const stackInfoSlice = createSlice({
  name: "stackholderinfo",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }  
    },
    detailtLoader: (state) => { 
      if ( state.detailLoading != "idle") {
        state.detailLoading = "idle";
      }
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadStakeholderInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadStakeholderInit.fulfilled, (state, action) => {
      state.loading = "succeeded"; 
      state.list = action.payload.data.stakeholder_list||[];

    });

    builder.addCase(loadStakeholderInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadStakeholder.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadStakeholder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.stakeholder_list||[]; 
    });

    builder.addCase(loadStakeholder.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadStakeholderDetail.pending, (state) => {
      state.detailLoading = "pending";
    });

    builder.addCase(loadStakeholderDetail.fulfilled, (state, action) => {
      state.detailLoading = "succeeded";   
      state.stakeholder_others = action.payload.data.stakeholder_others||[];
      state.stakeholder_detail = action.payload.data.stakeholder_detail||[]; 
    });

    builder.addCase(loadStakeholderDetail.rejected, (state, action) => {
      state.detailLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadStackInvvestmnet.pending, (state) => {
      state.detailLoading = "pending";
    });

    builder.addCase(loadStackInvvestmnet.fulfilled, (state, action) => {
      state.detailLoading = "succeeded"; 
      state.investList = action.payload.data.stakeholder_investment||[]; 
    });

    builder.addCase(loadStackInvvestmnet.rejected, (state, action) => {
      state.detailLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadStackPayment.pending, (state) => {
      state.detailLoading = "pending";
    });

    builder.addCase(loadStackPayment.fulfilled, (state, action) => {
      state.detailLoading = "succeeded"; 
      state.paymentList = action.payload.data.stakeholder_payment||[];

    });

    builder.addCase(loadStackPayment.rejected, (state, action) => {
      state.detailLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadStackProperty.pending, (state) => {
      state.detailLoading = "pending";
    });

    builder.addCase(loadStackProperty.fulfilled, (state, action) => {
      state.detailLoading = "succeeded"; 
      state.project_detail = action.payload.data.project_detail||[];
    });

    builder.addCase(loadStackProperty.rejected, (state, action) => {
      state.detailLoading = action.error.name;
      state.msg = action.error.message;
    });

  },
});

export default stackInfoSlice.reducer;
export const { initLoader, detailtLoader } = stackInfoSlice.actions;
