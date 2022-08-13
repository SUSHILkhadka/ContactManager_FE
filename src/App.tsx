import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BasicLayout } from "./layouts/BasicLayout";
import AdminRoute, { AdminRoute2 } from "./layouts/AdminRoutes";
import { RegisterPage } from "./pages/register/RegisterPage";
import { LoginPage } from "./pages/login/LoginPage";
import { HomePage } from "./pages/home/HomePage";
import { AddContactPage } from "./pages/contact/AddContactPage";
import { ListContactPage } from "./pages/contact/ListContactsPage";
import { AboutPage } from "./pages/about/About";

function App() {
  const [loggedIn, setLoggedIn] = useState<string | null>("d");

  return (
    <>
      <BrowserRouter>
        <div>contact app</div>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route path="/" element={<AdminRoute loggedIn={loggedIn} />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/about" element={<AdminRoute loggedIn={loggedIn} />}>
              <Route index element={<AboutPage />} />
            </Route>
            <Route
              path="/contact/add"
              element={<AdminRoute loggedIn={loggedIn} />}
            >
              <Route index element={<AddContactPage />} />
            </Route>
            <Route
              path="/contact/list"
              element={<AdminRoute loggedIn={loggedIn} />}
            >
              <Route index element={<ListContactPage />} />
            </Route>
          </Route>

          <Route path="register" element={<RegisterPage />} />
          <Route path="/login" element={<AdminRoute2 loggedIn={loggedIn} />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
