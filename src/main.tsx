import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import {GOOGLE_ID} from "@/Common/configurations.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
