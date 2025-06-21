import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  indOrgLoading: "idle",
  approveLoading:"idle",
  list: [],
  indOrgData: {},
  reg_datails:{},
  msg: "",
};

export const loadRegistration = createAsyncThunk(
  "registration/loadConfig",
  () => {
    let req = { type: "get_registration_info", data:{} };
    return socket.post(req);
  }
);

export const loadRegisterDetail = createAsyncThunk(
  "registration/loadDetail",
  (data) => {
    let req = { type: "get_registration_detail", data };
    return socket.post(req);
  }

);
export const loadRegisApprove = createAsyncThunk(
  "registration/approveConfig",
  (data) => {
    let req = { type: "approve_registration", data };
    return socket.post(req);
  }
);
export const deleteRegistration = createAsyncThunk(
  "registration/deleteConfig",
  (data) => {
    let req = { type: "delete_registration_info", data };
    return socket.post(req);
  }
);


const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    initLoader: (state) => {
      if ( state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      } 
    },
    approveLoader: (state) => { 
      if( state.approveLoading != "idle"){
        state.approveLoading = "idle";
      } 
    },
    initDetailsLoader: (state) => {
        state.reg_datails={};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRegistration.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadRegistration.fulfilled, (state, action) => {
      state.loading = "succeeded";
      // console.log(action);
      state.list = action.payload.data.reg_request;

    });

    builder.addCase(loadRegistration.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadRegisterDetail.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadRegisterDetail.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.reg_datails = action.payload.data.reg_detail;

    });

    builder.addCase(loadRegisterDetail.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });


    builder.addCase(loadRegisApprove.pending, (state) => {
      state.approveLoading = "pending";
    });

    builder.addCase(loadRegisApprove.fulfilled, (state, action) => {
      state.approveLoading = "succeeded"; 
      state.msg = action.payload.data.msg;

    });

    builder.addCase(loadRegisApprove.rejected, (state, action) => {
      state.approveLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteRegistration.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteRegistration.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded"; 
      state.msg = action.payload.data.msg;

    });

    builder.addCase(deleteRegistration.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

  },
});

export default registrationSlice.reducer;
export const { initLoader,approveLoader,initDetailsLoader } = registrationSlice.actions;
