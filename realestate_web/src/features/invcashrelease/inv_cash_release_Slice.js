import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed"; 
  addUpdateLoading: "idle", 
  list: [],
  projectlist:[],
  profitAmount:0,
  availableAmount:0,
  investlist:[],
  msg: "",
};

export const loadInvRelesaeConfig = createAsyncThunk(
  "invrelesae/loadConfig",
  () => {
    let req = { type: "get_inv_release_info", data: {} }; 
    return socket.post(req);
  }
);
export const loadNewRelease = createAsyncThunk(
  "invrelesae/NewConfig",
  () => {
    let req = { type: "get_project_name_list_completed", data: {} }; 
    return socket.post(req);
  }
);
export const submitRelesaeConfig = createAsyncThunk(
  "invrelesae/submitConfig",
  (data) => {
    let req = { type: "get_inv_investment_info", data: data }; 
    return socket.post(req);
  }
);

export const updateInvRelesaeConfig = createAsyncThunk(
  "invrelesae/updateConfig",
  (data) => {
    let req = { type: "update_inv_release_info", data: data }; 
    return socket.post(req);
  }
);

export const saveInvRelesaeConfig = createAsyncThunk(
  "invrelesae/saveConfig",
  (data) => {
    let req = { type: "save_inv_release_info", data: data };
    return socket.post(req);
  }
);

export const DeleteInvRelesaeConfig = createAsyncThunk(
  "invrelesae/deleteConfig",
  (data) => {
    let req = { type: "delete_inv_release_info", data: data };
    return socket.post(req);
  }
);
export const submitReleaseAcknowledge = createAsyncThunk(
    "invrelesae/updateacknowledge",
    (data) => {
      let req = { type: "post_inv_release_info", data: data };
      return socket.post(req);
    }
  );

const invrelesaeSlice = createSlice({
  name: "invrelesae",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle" ) {
        state.addUpdateLoading = "idle";
      }
    },
    prRefresh: (state, action) => {
      state.profitAmount=0; 
      state.availableAmount=0,
      state.investlist=[];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInvRelesaeConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadInvRelesaeConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.release_info;
    });

    builder.addCase(loadInvRelesaeConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadNewRelease.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadNewRelease.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.projectlist = action.payload.data.project_name;
    });

    builder.addCase(loadNewRelease.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitRelesaeConfig.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(submitRelesaeConfig.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.investlist = action.payload.data.investment_info;
      state.availableAmount = (action.payload.data.inv_withdrawl_amount||0)+(action.payload.data.inv_release_amount||0); 
      state.profitAmount =(action.payload.data.profit_amount||0) -((action.payload.data.profit_withdrawl_amount||0)+(action.payload.data.profit_release_amount||0));

    });

    builder.addCase(submitRelesaeConfig.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateInvRelesaeConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateInvRelesaeConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateInvRelesaeConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(saveInvRelesaeConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(saveInvRelesaeConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(saveInvRelesaeConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(DeleteInvRelesaeConfig.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(DeleteInvRelesaeConfig.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(DeleteInvRelesaeConfig.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(submitReleaseAcknowledge.pending, (state) => {
        state.addUpdateLoading = "pending";
      });
  
      builder.addCase(submitReleaseAcknowledge.fulfilled, (state, action) => {
        state.addUpdateLoading = "succeeded";
        state.msg = action.payload.data.msg;
      });
  
      builder.addCase(submitReleaseAcknowledge.rejected, (state, action) => {
        state.addUpdateLoading = action.error.name;
        state.msg = action.error.message;
      });
  },
});

export default invrelesaeSlice.reducer;
export const { initLoader, prRefresh } = invrelesaeSlice.actions;
