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
import Layout from "./components/layout.tsx";
import Students from "./student/pages/students.tsx";
import Payments from "./payment/pages/payment.tsx";
import Add from "./payment/pages/add.tsx";
import Thanks from "./register/pages/thanks.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastContainer theme="colored" />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Layout />}>
            <Route
              index
              element={<Navigate to={"/dashboard/students"} replace />}
            />
            <Route path="/dashboard/students" element={<Students />} />
            <Route path="/dashboard/students/:noInduk" element={<Students />} />
            <Route path="/dashboard/payments">
              <Route index element={<Payments />} />
              <Route
                path={"/dashboard/payments/:noInduk"}
                element={<Payments />}
              />
              <Route path="/dashboard/payments/add" element={<Add />} />
            </Route>
          </Route>
          <Route path="/" element={<Navigate to={"/login"} replace />} />
          <Route path="/not-found" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to={"/not-found"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thanks" element={<Thanks />} />
          {/* dashboard */}
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
