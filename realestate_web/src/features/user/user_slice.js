import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { socket } from "../../utils/socket";


var initialState = {
  loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
  msg: "",
  module: JSON.parse(localStorage.menu||"[]")?.length||0,
  pageList: JSON.parse(localStorage.page_list||"[]") ||0,
  user_type: localStorage.getItem("login_type") || "",
  admin_type: localStorage.getItem("admin_type") || 0,
  login: !!localStorage.getItem("session_key") ? true : false,
  fullname: localStorage.getItem("fullname") || "",
  read_only: JSON.parse(localStorage.read_only ?? 0),
};

export const getLogin = createAsyncThunk("user/login", (body) => {
  //let { username, password } = body;
  let req = { type: "login", data: body };
  return socket.post(req);
});

export const getLogout = createAsyncThunk("user/logout", () => {
  let req = { type: "logout", data: {} };
  return socket.post(req);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { 
    initLoader: (state) => {
      if (
        state.loading != "idle"
      ) {
        state.loading = "idle";
      }
    },
    changeType: (state, action) => {
      state.user_type = action.payload;
      localStorage.setItem("login_type", action.payload);
    },
    updatePageList: (state, action) => {
      state.pageList = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLogin.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(getLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.login = action.payload.tag == "success";
      state.msg = action.payload.data.msg;
      state.fullname = action.payload.data.fullname;
      state.pageList = action.payload.data?.page_list||[];
      state.module = action.payload.data?.modules?.length || 0;
      state.read_only = action.payload.data.read_only == 1;
      state.user_type = action.payload.data.login_type;
      state.admin_type = action.payload.data.read_only ||0 ;
      localStorage.clear();
      localStorage.setItem("session_key", action.payload.data.session_key);
      localStorage.setItem("login_id", action.payload.data.login_id);
      localStorage.setItem("login_type", action.payload.data.login_type);
      localStorage.setItem("i18nextLng", "en");
      localStorage.setItem("fullname", action.payload.data.fullname);
      localStorage.setItem("page_list", JSON.stringify(action.payload.data.page_list||[]));
      localStorage.setItem("admin_type", action.payload.data.read_only);
      localStorage.setItem("read_only", action.payload.data.read_only == 1);
      localStorage.setItem("menu", JSON.stringify(action.payload.data.modules));
    });

    builder.addCase(getLogin.rejected, (state, action) => {
      state.loading = action.error.name;
      state.login = false;
      state.msg = action.error.message;
    });

    builder.addCase(getLogout.pending, (state, action) => {
      state.loading = "pending";
    });

    builder.addCase(getLogout.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.login = false;
      state.msg = action.payload.data.msg;
      state.fullname = "";
      state.user_type = "";
      localStorage.clear();
      localStorage.setItem("i18nextLng", 'en');
    });

    builder.addCase(getLogout.rejected, (state, action) => {
      state.loading = action.error.name;
      state.login = true;
      state.msg = action.error.message;
    });
  },
});

export const { initLoader, changeType, updatePageList } = userSlice.actions;
export default userSlice.reducer;
