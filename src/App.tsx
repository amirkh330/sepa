import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { WelcomePage } from "./components/Welcome/WelcomePage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { ROUTES } from "./config/routes";
import { HomePage } from "./components/Home/HomePage";
import { StagePage } from "./components/StagePage/StagePage";
import { ResultPage } from "./components/ResultPanel/ResultPage";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";

import "./assets/fonts/font.css";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer],
});

const darkTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Vazirmatn, sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

export const App: React.FC = () => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {/* مسیر عمومی خوش‌آمدگویی */}
            <Route path={ROUTES.welcome} element={<WelcomePage />} />

            {/* مسیرهای محافظت‌شده برای بازیکنان ثبت‌نام‌شده */}
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.home} element={<HomePage />} />
              <Route path="/stage/:id" element={<StagePage />} />
              <Route path="/result/:id" element={<ResultPage />} />
            </Route>

            {/* ریدایرکت برای مسیرهای ناشناخته */}
            <Route
              path="*"
              element={<Navigate to={ROUTES.welcome} replace />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
};
