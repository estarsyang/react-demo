import React from "react";
import ReactDOM from "react-dom/client";
// reset css
import "reset-css";
// global css
import "@/assets/styles/global.scss";

import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
