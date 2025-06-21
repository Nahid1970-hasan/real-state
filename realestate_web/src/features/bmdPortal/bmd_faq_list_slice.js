import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle", //"idle" | "pending" | "succeeded" | "failed";
    faqDataList: {},  
    msg: ''
  };
  export const loadBMDFAQData= createAsyncThunk("bmdportal/faqdatalist", () => {
    let req = { type: "get_bmd_faq_list", data: {} }; 
    return socket.post(req);
  });
 
  const loadBMDFAQDataSlice = createSlice({
    name: "faqdatalist",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadBMDFAQData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadBMDFAQData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.faqDataList = action.payload.data.bmd_faq_list; 
        //console.log(action.payload)
      });
  
      builder.addCase(loadBMDFAQData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default loadBMDFAQDataSlice.reducer;