import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { WebRouter } from "./routes";
import { StyledThemeProvider } from "./styles/styled-theme-provider";
import './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledThemeProvider>
        <RouterProvider router={WebRouter} />
      </StyledThemeProvider>
    </Provider>
  </React.StrictMode>
);
