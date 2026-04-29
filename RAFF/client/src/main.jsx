import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./context/StoreContext";
import { UiProvider } from "./context/UiContext";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UiProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </UiProvider>
  </React.StrictMode>
);