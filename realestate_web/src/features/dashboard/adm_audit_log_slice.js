import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  dataList:[],
  msg: ''
};

export const loadAdmALDataInit = createAsyncThunk("AdmAuditLog/auditLogsInit", () => {
  let req = { type: "get_audit_logs_adm_init", data: {}};
  return socket.post(req);
});


export const loadAdmALData = createAsyncThunk("AdmAuditLog/auditLogs", (data) => {
  let req = { type: "get_audit_logs_adm", data: data};
  return socket.post(req);
});
 
const auditLogAdmSlice = createSlice({
  name: "AdmAuditLog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loadAdmALDataInit.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdmALDataInit.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dataList = action.payload.data.audit_log; 
    });

    builder.addCase(loadAdmALDataInit.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadAdmALData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadAdmALData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dataList = action.payload.data.audit_log; 
    });

    builder.addCase(loadAdmALData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
  },
});


export default auditLogAdmSlice.reducer;
