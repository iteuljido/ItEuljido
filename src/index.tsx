import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "style/GlobalStyle";
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import dotenv from "dotenv";

dotenv.config();

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_KEY,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
