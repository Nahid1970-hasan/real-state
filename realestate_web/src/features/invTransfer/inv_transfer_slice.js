import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  // updateLoading: "idle",
  addUpdateLoading: "idle",
  // deleteLoading: "idle",
  list: [],
  projectlist:[],
  msg: "",
};

export const loadInvtransferConfig = createAsyncThunk(
  "invtransfer/loadConfig",
  () => {
    let req = { type: "get_inv_transfer_info", data: {} }; 
    return socket.post(req);
  }
);
export const loadInvtransfer = createAsyncThunk(
  "invtransfer/NewConfig",
  () => {
    let req = { type: "get_inv_transfer_to", data: {} }; 
    return socket.post(req);
  }
);


export const updateInvtransferConfig = createAsyncThunk(
  "invtransfer/updateConfig",
  (data) => {
    let req = { type: "update_inv_transfer_info", data: data }; 
    return socket.post(req);
  }
);




const invtransferSlice = createSlice({
  name: "invtransfer",
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
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvtransferConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvtransferConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.withdrawl_info;
    });

    builder.addCase(loadInvtransferConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadInvtransfer.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvtransfer.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.projectlist = action.payload.data.project_name;
    });

    builder.addCase(loadInvtransfer.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });


    builder.addCase(updateInvtransferConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateInvtransferConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateInvtransferConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

   
  },
});

export default invtransferSlice.reducer;
export const { initLoader } = invtransferSlice.actions;
