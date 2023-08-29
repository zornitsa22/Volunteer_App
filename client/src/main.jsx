import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProviderVol from "./context/AuthVol.jsx";
import AuthProviderOrg from "./context/AuthOrg.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderVol> {/* Use the volunteer auth context */}
      <AuthProviderOrg> {/* Use the organization auth context */}
        <App />
      </AuthProviderOrg>
      </AuthProviderVol>
    </BrowserRouter>
  </React.StrictMode>
);
