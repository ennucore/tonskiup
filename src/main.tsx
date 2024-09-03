import "./polyfills";
import App from "./App";
import "./index.css";
import { StrictMode } from "react";
import { render } from "react-dom";
import eruda from "eruda";
import * as Sentry from "@sentry/react";
// eruda.init();

Sentry.init({
  dsn: "https://420644e7cdb4f44e791df5e276bd72ee@o306298.ingest.us.sentry.io/4507888620601344",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root") as HTMLElement
);
