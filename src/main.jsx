import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
       <GoogleOAuthProvider clientId="1088716956562-mu4g66468smrh8rf03cth8lhtegbrujo.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    </Provider>
  </PersistGate>
);
