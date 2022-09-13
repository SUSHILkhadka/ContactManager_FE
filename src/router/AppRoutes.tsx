import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { checkToken } from "../redux_toolkit/slices/authSlice";
import { AppDispatch, RootState } from "../redux_toolkit/stores/store";
import { ProtectedRoutes, redirectMultiplePaths } from "./routerUtils";

function AppRoutes() {
  const authInfo = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkToken());
  }, []);
  if (authInfo.status == "loading") {
    return <div>SplashScreen</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {authInfo.status === "rejected" ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {redirectMultiplePaths(["/", "/home"], <Navigate to="/login" />)}
            <Route path="*" element={<div>Not found</div>} />
          </>
        ) : (
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<BasicLayout />}></Route>
            {redirectMultiplePaths(
              ["/login", "register"],
              <Navigate to="/home" />
            )}
            <Route path="*" element={<div>Not found</div>} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
