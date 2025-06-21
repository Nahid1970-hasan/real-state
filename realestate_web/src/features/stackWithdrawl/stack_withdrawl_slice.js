import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  tempLoading: "idle",
  addUpdateLoading: "idle", 
  list: [],
  tempList:[],
  msg: "",
};

export const loadWithdrawlInfo = createAsyncThunk(
  "stackwithdrawl/loadwithdrawlinfo",
  (data) => {
    let req = { type: "get_withdrawl_info", data: data }; 
    return socket.post(req);
  }
);

export const loadWithdrawlInfoInit = createAsyncThunk(
  "stackwithdrawl/loadwithdrawlinfoInit",
  () => {
    let req = { type: "get_withdrawl_info_init", data: {} }; 
    return socket.post(req);
  }
);

export const undateWithdrawlAck = createAsyncThunk(
  "stackwithdrawl/updatewithdrwalack",
  (data) => {
    let req = { type: "update_withdrawl_ack", data: data }; 
    return socket.post(req);
  }
);
export const loadMsgTemplateInfo = createAsyncThunk(
  "stackwithdrawl/loadmsgtemplate",
  () => {
    let req = { type: "get_msg_template", data: {} }; 
    return socket.post(req);
  }
);

const stackwithDrawlSlice = createSlice({
  name: "stackwithdrawl",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle") {
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
    builder.addCase(loadWithdrawlInfoInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadWithdrawlInfoInit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.withdrawl_info;
    });

    builder.addCase(loadWithdrawlInfoInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadWithdrawlInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadWithdrawlInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.withdrawl_info;
    });

    builder.addCase(loadWithdrawlInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(undateWithdrawlAck.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(undateWithdrawlAck.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(undateWithdrawlAck.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });


      builder.addCase(loadMsgTemplateInfo.pending, (state) => {
        state.tempLoading = "pending";
      });
  
      builder.addCase(loadMsgTemplateInfo.fulfilled, (state, action) => {
        state.tempLoading = "succeeded";
        state.tempList = action.payload.data.msg_template;
      });
  
      builder.addCase(loadMsgTemplateInfo.rejected, (state, action) => {
        state.tempLoading = action.error.name;
        state.msg = action.error.message;
      });

    
  },
});

export default stackwithDrawlSlice.reducer;
export const { initLoader, tempLoader } = stackwithDrawlSlice.actions;
