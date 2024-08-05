import "./polyfills";
import App from "./App";
import "./index.css";
import { StrictMode } from "react";
import { render } from "react-dom";
import eruda from "eruda";

// eruda.init();
render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root") as HTMLElement
);
