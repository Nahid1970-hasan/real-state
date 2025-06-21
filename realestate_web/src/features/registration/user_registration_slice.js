import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
  validating: "idle",
  user_id: 0,
  addUpdateloading: "idle", 
  user_signup: false, 
  user_info: {}, 
};

export const setUserRegistration = createAsyncThunk("registration/user", (body) => { 
  let req = { type: "check_email_mobile", data: body }; 
  return socket.post(req);
});

export const validateUserRegistration = createAsyncThunk("registration/validate", (body) => { 
  let req = { type: "check_validation_number", data: body }; 
  return socket.post(req);
});

export const saveUserData= createAsyncThunk("registration/saveData", (body) => { 
  let req = { type: "save_registration_detail", data: body }; 
  return socket.post(req);
});

const userRegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    initURLoader: (state) => {
      if (  state.addUpdateloading == "succeeded" || state.addUpdateloading == "failed"
      ) {
        state.addUpdateloading = "idle";
      }
      if ( state.validating == "succeeded" || state.validating == "failed"
      ) {
        state.validating = "idle";
      }
    },
    registration: (state) => {
      state.user_signup = false;
    },
    status: (state, action) => { 
      state.user_info = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUserRegistration.pending, (state) => {
      state.addUpdateloading = "pending";
    });

    builder.addCase(setUserRegistration.fulfilled, (state, action) => {
      state.addUpdateloading = "succeeded"; 
      state.msg = action.payload.data.msg; 
    });

    builder.addCase(setUserRegistration.rejected, (state, action) => {
      state.addUpdateloading = action.error.name;
      state.msg = action.error.message; 
    });

    builder.addCase(validateUserRegistration.pending, (state) => {
      state.validating = "pending";
    });

    builder.addCase(validateUserRegistration.fulfilled, (state, action) => {
      state.validating = "succeeded";
      state.user_signup = action.payload.tag == "success";
      state.user_id = action.payload.data.pre_user_id;
      state.msg = action.payload.data.msg; 
    });

    builder.addCase(validateUserRegistration.rejected, (state, action) => {
      state.validating = action.error.name;
      state.user_signup = false;
      state.msg = action.error.message; 
    });


    builder.addCase(saveUserData.pending, (state) => {
      state.addUpdateloading = "pending";
    });

    builder.addCase(saveUserData.fulfilled, (state, action) => {
      state.addUpdateloading = "succeeded"; 
      state.msg = action.payload.data.msg; 
     
    });

    builder.addCase(saveUserData.rejected, (state, action) => {
      state.addUpdateloading = action.error.name;
      state.msg = action.error.message; 
    });
  },
});

export default userRegistrationSlice.reducer;
export const { initURLoader,status } = userRegistrationSlice.actions;

