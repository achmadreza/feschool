import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./global.css";
// import App from "./App.tsx";
import ErrorPage from "./error/pages/error.tsx";
import Login from "./login/pages/login.tsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import Register from "./register/pages/register.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastContainer theme="colored" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} replace />} />
          <Route path="/not-found" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to={"/not-found"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
