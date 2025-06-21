import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
  org_signup: false,
};

export const setOrgRegistration = createAsyncThunk("registration/org_registration", (body) => {
  //let { username, password } = body;
  let req = { type: "save_users_detail_org", data: body };
  console.log(req);
  return socket.post(req);
});

export const updateOrgRegistration = createAsyncThunk("registration/org_update", (body) => {
  //let { username, password } = body;
  let req = { type: "update_users_detail_org", data: body };
  console.log(req);
  return socket.post(req);
});

const orgRegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    initOrgLoader: (state) => {
      if (
        state.loading == "succeeded" ||
        state.loading == "failed"
      ) {
        state.loading = "idle";
      }
    },
    registration: (state) => {
      state.org_signup = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOrgRegistration.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(setOrgRegistration.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.org_signup = action.payload.tag == "success";
      state.msg = action.payload.data.msg;
      // console.log(action);
    });

    builder.addCase(setOrgRegistration.rejected, (state, action) => {
      state.loading = action.error.name;
      state.org_signup = false;
      state.msg = action.error.message;
      // console.log(action);
    });
    builder.addCase(updateOrgRegistration.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(updateOrgRegistration.fulfilled, (state, action) => {
      state.loading = "succeeded"; 
      state.msg = action.payload.data.msg;
      // console.log(action);
    });

    builder.addCase(updateOrgRegistration.rejected, (state, action) => {
      state.loading = action.error.name; 
      state.msg = action.error.message;
      // console.log(action);
    });
  },
});

export default orgRegistrationSlice.reducer;
export const { initOrgLoader } = orgRegistrationSlice.actions;

