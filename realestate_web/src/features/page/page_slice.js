import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  button: false,
  buttonText: "",
  buttonIcon: "",
  onClick: ()=>{}
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    loadPage: (state, action) => {
      const { title, button = false, buttonText, buttonIcon, onClick } = action.payload;
      //console.log(title);
      state.title = title || state.title;
      state.button = button;
      state.buttonIcon = buttonIcon;
      state.buttonText = buttonText;
      state.onClick = onClick || state.onClick;
    },
  },
});

export default pageSlice.reducer;
export const { loadPage } = pageSlice.actions;
