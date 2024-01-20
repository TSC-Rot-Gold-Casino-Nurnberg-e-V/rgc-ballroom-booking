import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./AppRouter.tsx";
import { CssBaseline } from "@mui/material";
import { deDE, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import dayjs from "dayjs";
import { UserContextProvider } from "./UserContextProvider.tsx";

dayjs.locale("de");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="de"
      localeText={
        deDE.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);
