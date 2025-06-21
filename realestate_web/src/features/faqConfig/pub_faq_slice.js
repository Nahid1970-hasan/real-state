import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    addUpdateLoading: "idle", 
    list: [{"question":"What is Reatstate?","answer":"Realstate is Real State","faq_id":2}],
    msg: "",
};

export const loadPubFaq = createAsyncThunk(
  "pubFaqData/loadConfig",
  () => {
    let req = { type: "get_faq_list_pub", data: {} }; 
    return socket.post(req);
  }
);


const pubFaqslice = createSlice({
  name: "pubFaqData",
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
    builder.addCase(loadPubFaq.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadPubFaq.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.list = action.payload.data.faq_list;
    });

    builder.addCase(loadPubFaq.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

  },
});

export default pubFaqslice.reducer;
export const { initLoader } = pubFaqslice.actions;
