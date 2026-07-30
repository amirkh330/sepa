import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

// ثبت سرویس ورکر PWA
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    // در صورت وجود آپدیت جدید، می‌توان پیام دلخواهی به کاربر نشان داد
    if (confirm("New content available. Reload to update?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline!");
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
