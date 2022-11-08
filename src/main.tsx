import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider position="top-right">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>
);
