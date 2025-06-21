import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  list1: [],
  updateLoading: "idle",
  msg: "",
};

export const loadViewprogress = createAsyncThunk("invprogsview/loadviewprogress", (data) => {
  let req = { type: "get_project_name_list", data: data  };
  //console.log(req);
  return socket.post(req);
});


const invprogsviewSlice = createSlice({
  name: "invprogsview",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (
        state.updateLoading == "succeeded" ||
        state.updateLoading == "failed"
      ) {
        state.updateLoading = "idle";
      }
    },
  },
  extraReducers: (builder) => {

    builder.addCase(loadViewprogress.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadViewprogress.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.org_users || [];
    });

    builder.addCase(loadViewprogress.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });



  },
});

export default invprogsviewSlice.reducer;
export const {initLoader} = invprogsviewSlice.actions;
