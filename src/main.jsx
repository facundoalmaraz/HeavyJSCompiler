import React from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import "./index.css";
import { CompilerProvider } from "./context/CompilerProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CompilerProvider>
    <RouterProvider router={router} />
  </CompilerProvider>
);
