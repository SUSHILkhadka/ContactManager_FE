import {useEffect, useState } from "react";
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
import { getLoginResponse, getLogStatus } from "./services/localStorage";
import { useDispatch, useSelector } from "react-redux";
import {  makeLoggedInWithInfo } from "./redux_toolkit/slices/authSlice";
import { LogoutPage } from "./pages/logout/LogoutPage";

function App() {
  const dispatch=useDispatch();
  const authInfo = useSelector((state: any) => state.auth);
  useEffect(()=>{
    const loginStatus=getLogStatus();
    if(loginStatus){
      const response=getLoginResponse();
      try{
      dispatch(makeLoggedInWithInfo(JSON.parse(response)));
      }
      catch(e){
        console.log('got eror',e)
      }

    }
  },[])

  return (
    <>
      <BrowserRouter>
        <div>CONTACT MANAGEMENT APP</div>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route path="/" element={<AdminRoute loggedIn={authInfo.login} />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path="/about" element={<AdminRoute loggedIn={authInfo.login} />}>
              <Route index element={<AboutPage />} />
            </Route>
            <Route
              path="/contact/add"
              element={<AdminRoute loggedIn={authInfo.login} />}
            >
              <Route index element={<AddContactPage />} />
            </Route>
            <Route
              path="/contact/list"
              element={<AdminRoute loggedIn={authInfo.login} />}
            >
              <Route index element={<ListContactPage />} />
            </Route>
            <Route
              path="/logout"
              element={<AdminRoute loggedIn={authInfo.login} />}
            >
              <Route index element={<LogoutPage />} />
            </Route>
          </Route>

          <Route path="register" element={<RegisterPage />} />
          <Route path="/login" element={<AdminRoute2 loggedIn={authInfo.login} />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
