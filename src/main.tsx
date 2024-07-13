import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_ID } from "./common/configurations.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import ChatContextProvider from "./context/ChatContext.tsx";
import { NotificationSocketProvider } from "./context/NotificationSocket.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" />
      <GoogleOAuthProvider clientId={`${GOOGLE_ID}`}>
        <BrowserRouter>
          <ChatContextProvider>
            <SocketProvider>
              <NotificationSocketProvider>
                <App />
              </NotificationSocketProvider>
            </SocketProvider>
          </ChatContextProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
