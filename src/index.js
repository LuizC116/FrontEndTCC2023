import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/index";
import "./global.css";
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
