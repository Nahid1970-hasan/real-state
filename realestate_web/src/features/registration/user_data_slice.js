import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",  
  user_type: "",  
  pageList:[],
};

export const setUserTypeData = createAsyncThunk("userData/set", (data) => { 
  let req = { type: "get_modules", data: data }; 
  return socket.post(req);
});
 

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.loading != "idle") {
        state.loading = "idle";
      }
       
    }, 
  },
  extraReducers: (builder) => {
    builder.addCase(setUserTypeData.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(setUserTypeData.fulfilled, (state, action) => {
      state.loading = "succeeded"; 
      state.user_type = action.payload.data.login_type ;
      state.pageList = action.payload.data.page_list||[] ;
      localStorage.setItem("menu", JSON.stringify(action.payload.data.modules));
      localStorage.setItem("page_list", JSON.stringify(action.payload.data.page_list||[]));
      state.msg = action.payload.data.msg; 
    });

    builder.addCase(setUserTypeData.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message; 
    }); 
  },
});

export default userDataSlice.reducer;
export const { initLoader } = userDataSlice.actions;

