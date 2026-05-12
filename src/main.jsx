import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
} from "react-router-dom";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
<Toaster
  position="top-center"

  toastOptions={{
    style: {
      borderRadius: "16px",
      padding: "14px 18px",
      fontWeight: "700",
    },
  }}
/>

    <App />
  </BrowserRouter>
);