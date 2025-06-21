import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle",
   
    galleryData: [],  
    msg: ''
  };
  export const loadPubPhotoData= createAsyncThunk("pubphotoGallery/pubphotodata", () => { 
    let req = { type: "get_photo_list_pub", data: {} }; 
    return socket.post(req);
  });


  const pubPhotoGalleryInfoSlice = createSlice({
    name: "pubphotoGallery",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(loadPubPhotoData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadPubPhotoData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.galleryData = action.payload.data.pub_photo_list; 
        //console.log(action.payload)
      });
  
      builder.addCase(loadPubPhotoData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default pubPhotoGalleryInfoSlice.reducer;
  