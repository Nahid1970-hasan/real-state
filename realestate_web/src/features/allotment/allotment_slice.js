import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

var initialState = {
  loading: "idle",
  paymentLoading: "idle",
  bookLoading: "idle",  //"idle" | "pending" | "succeeded" | "failed";
  list: [],
  infolist:{},
  sublist: [],
  dropdoenlist: [],
  addUpdateLoading: "idle",
  districtList: [],
  paylist:[],
  msg: "",
};

export const loadBookingInfo = createAsyncThunk("allotment/loadBooking", (data) => {
  let req = { type: "get_booking_info", data: data };
  return socket.post(req);
});
export const loadBookingInfoInt = createAsyncThunk("allotment/loadBookingInt", (data) => {
  let req = { type: "get_booking_info_init", data: data };
  return socket.post(req);
});



export const updateBookingInfo = createAsyncThunk("allotment/updateBooking", (data) => {
  let req = { type: "update_booking_confirm_info", data: data };
  return socket.post(req);
});


export const loadBookingPayment = createAsyncThunk("allotment/loadBookingPayment", (data) => {
    let req = { type: "get_booking_payment_info", data: data};
    return socket.post(req);
  });
  

export const updateBookingAllotment = createAsyncThunk("allotment/updateAllotment", (data) => {
  let req = { type: "update_booking_allotment_info", data: data };
  return socket.post(req);
});

export const deleteBooking = createAsyncThunk("allotment/deleteBooking", (data) => {
  let req = { type: "delete_booking_info", data: data };
  return socket.post(req);
});
export const loadBookingDetail = createAsyncThunk("allotment/loadBookingDetail", (data) => {
    let req = { type: "get_booking_detail_info", data: data};
    return socket.post(req);
  });

const allotmentSlice = createSlice({
  name: "allotment",
  initialState,
  reducers: {
    initLoader: (state) => {
      if (state.addUpdateLoading != "idle"
      ) {
        state.addUpdateLoading = "idle";
      } 
    },
    initiateDetails: (state) => {
       state.infolist ={};
    },
    initiatePayments: (state) => {
      state.paylist = [];
      state.rem_amount = 0;
      state.total_amount = 0;
      state.paid_amount = 0;
   },
  },
  extraReducers: (builder) => {

    builder.addCase(loadBookingInfo.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBookingInfo.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dropdoenlist = action.payload.data.booking;
    });

    builder.addCase(loadBookingInfo.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });
    builder.addCase(loadBookingInfoInt.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(loadBookingInfoInt.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.dropdoenlist = action.payload.data.booking;
    });

    builder.addCase(loadBookingInfoInt.rejected, (state, action) => {
      state.loading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(updateBookingInfo.pending, (state, action) => {
      state.addUpdateLoading = "pending"
    });

    builder.addCase(updateBookingInfo.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(updateBookingInfo.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message
    }); 

    builder.addCase(loadBookingPayment.pending, (state) => {
        state.paymentLoading = "pending";
      });
  
      builder.addCase(loadBookingPayment.fulfilled, (state, action) => {
        state.paymentLoading = "succeeded";
        state.paylist = action.payload.data.booking_payment||[];
        state.rem_amount = action.payload.data.rem_amount ||0;
        state.total_amount = action.payload.data.total_amount||0;
        state.paid_amount = action.payload.data.paid_amount||0;
      });
  
      builder.addCase(loadBookingPayment.rejected, (state, action) => {
        state.paymentLoading = action.error.name;
        state.msg = action.error.message;
      });
 
    builder.addCase(updateBookingAllotment.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(updateBookingAllotment.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });
    builder.addCase(updateBookingAllotment.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(deleteBooking.pending, (state) => {
      state.addUpdateLoading = "pending";
    });

    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.addUpdateLoading = "succeeded";
      state.msg = action.payload.data.msg;
    });

    builder.addCase(deleteBooking.rejected, (state, action) => {
      state.addUpdateLoading = action.error.name;
      state.msg = action.error.message;
    });

    builder.addCase(loadBookingDetail.pending, (state) => {
        state.bookLoading = "pending";
      });
  
      builder.addCase(loadBookingDetail.fulfilled, (state, action) => {
        state.bookLoading = "succeeded";
        state.infolist = action.payload.data.booking_detail||{};
      });
  
      builder.addCase(loadBookingDetail.rejected, (state, action) => {
        state.bookLoading = action.error.name;
        state.msg = action.error.message;
      });
  },
});

export default allotmentSlice.reducer;
export const { initLoader, initiateDetails, initiatePayments } = allotmentSlice.actions;
