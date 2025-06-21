import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  tempLoading:"idle",
  addUpdateLoading: "idle", 
  list: [],
  tempList:[],
  msg: "",
};

export const loadInvestmentInfoInit = createAsyncThunk(
  "stackinvestment/loadinvestmentinfoInit",
  () => {
    let req = { type: "get_investment_info_init", data: {} };
  
    return socket.post(req);
  }
);

export const loadInvestmentInfo = createAsyncThunk(
  "stackinvestment/loadinvestmentinfo",
  (data) => {
    let req = { type: "get_investment_info", data: data };
  
    return socket.post(req);
  }
);

export const updateInvAckInfo = createAsyncThunk(
  "stackinvestment/updateinvackinfo",
  (data) => {
    let req = { type: "update_investment_ack", data: data };
   
    return socket.post(req);
  }
);
export const loadMSGTemplate = createAsyncThunk(
  "stackinvestment/loadmsdtemplate",
  () => {
    let req = { type: "get_msg_template", data: {} };
    
    return socket.post(req);
  }
);

const stackInvSlice = createSlice({
  name: "stackinvestment",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle") {
        state.addUpdateLoading = "idle";
      }
     
    },
    tempLoader: (state) => {
      if ( state.tempLoading != "idle"
      ) {
        state.tempLoading = "idle";
      } 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvestmentInfoInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvestmentInfoInit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.investment_info;
    });

    builder.addCase(loadInvestmentInfoInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadInvestmentInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvestmentInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.investment_info;
    });

    builder.addCase(loadInvestmentInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateInvAckInfo.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateInvAckInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateInvAckInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });


      builder.addCase(loadMSGTemplate.pending, (state) => {
        state.tempLoading = "pending";
      });
  
      builder.addCase(loadMSGTemplate.fulfilled, (state, action) => {
        state.tempLoading = "succeeded";
        state.tempList = action.payload.data.msg_template;
      });
  
      builder.addCase(loadMSGTemplate.rejected, (state, action) => {
        state.tempLoading = action.error.name;
        state.msg = action.error.message;
      });

    
  },
});

export default stackInvSlice.reducer;
export const { initLoader,tempLoader } = stackInvSlice.actions;
