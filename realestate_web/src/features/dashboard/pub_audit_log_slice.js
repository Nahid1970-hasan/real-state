import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dataList:[],
  msg: ''
};

export const loadPubALDataInit = createAsyncThunk("PubAuditLog/auditlogsinit", () => {
  let req = { type: "get_audit_logs_init", data: {}};
  return socket.post(req);
});


export const loadPubALData = createAsyncThunk("PubAuditLog/auditlogs", (data) => {
  let req = { type: "get_audit_logs", data: data};
  return socket.post(req);
});
 
const auditLogPubSlice = createSlice({
  name: "PubAuditLog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadPubALDataInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubALDataInit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dataList = action.payload.data?.audit_log?.map((d)=>({...d, detail: d.method=="LOGIN"?JSON.stringify({...JSON.parse(d.detail), password:"*****"}): d.detail})); 
    });

    builder.addCase(loadPubALDataInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadPubALData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubALData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dataList = action.payload.data?.audit_log?.map((d)=>({...d, detail: d.method=="LOGIN"?JSON.stringify({...JSON.parse(d.detail), password:"*****"}): d.detail})); ; 
    });

    builder.addCase(loadPubALData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default auditLogPubSlice.reducer;
