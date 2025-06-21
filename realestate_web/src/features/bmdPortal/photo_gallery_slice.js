import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { socket } from "../../utils/socket";

  var initialState = {
    loading: "idle",
    uploading:"idle", //"idle" | "pending" | "succeeded" | "failed";
    galleryData: [],  
    msg: ''
  };
  export const loadPhotoData= createAsyncThunk("photoGallery/pdfinfo", (data) => { 
    let req = { type: "get_photo_list", data: data }; 
    return socket.post(req);
  });

  export const uploadPhoto= createAsyncThunk("photoGallery/uploadPhoto", (data) => {   
    return socket.upload(data);
  });

  export const deletePhoto = createAsyncThunk("photoGallery/deletePhoto", (data) => { 
    let req = { type: "delete_selected_photo", data: data }; 
    return socket.post(req);
  });
 
  const photoGalleryInfoSlice = createSlice({
    name: "photoGallery",
    initialState,
    reducers: {
      initLoader: (state) => {
        if ( state.uploading != "idle" ) {
          state.uploading = "idle";
        }
      },
    },
    extraReducers: (builder) => {
      builder.addCase(loadPhotoData.pending, (state) => {
        state.loading = "pending";
      });
  
      builder.addCase(loadPhotoData.fulfilled, (state, action) => {
        state.loading = "succeeded"; 
        state.galleryData = action.payload.data.photo_list; 
        //console.log(action.payload)
      });
  
      builder.addCase(loadPhotoData.rejected, (state, action) => {
        state.loading = action.error.name;
        state.msg = action.error.message;
      }); 

      builder.addCase(uploadPhoto.pending, (state) => {
        state.uploading = "pending";
      });
  
      builder.addCase(uploadPhoto.fulfilled, (state, action) => {
        state.uploading = "succeeded"; 
        state.msg = action.payload.data.msg; 
        //console.log(action.payload)
      });
  
      builder.addCase(uploadPhoto.rejected, (state, action) => {
        state.uploading = action.error.name;
        state.msg = action.error.message;
      }); 
      
      builder.addCase(deletePhoto.pending, (state) => {
        state.uploading = "pending";
      });
  
      builder.addCase(deletePhoto.fulfilled, (state, action) => {
        state.uploading = "succeeded"; 
        state.msg = action.payload.data.msg; 
        //console.log(action.payload)
      });
  
      builder.addCase(deletePhoto.rejected, (state, action) => {
        state.uploading = action.error.name;
        state.msg = action.error.message;
      }); 
    },
  });

  export default photoGalleryInfoSlice.reducer;
  export const { initLoader } = photoGalleryInfoSlice.actions;