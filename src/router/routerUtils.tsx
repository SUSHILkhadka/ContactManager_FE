import { message } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { makeLoggedOut } from "../redux_toolkit/slices/authSlice";
import { getRefreshToken } from "../services/localStorageAndCookies";

export const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!Boolean(getRefreshToken())) {
      message.error("refresh token expired");
      dispatch(makeLoggedOut());
    }
  }, [navigate]);
  return Boolean(getRefreshToken()) ? <Outlet /> : <Navigate to="/login" />;
};

export const redirectMultiplePaths = (paths: string[], element: JSX.Element) =>
  paths.map((path: string) => (
    <Route key={path} path={path} element={element} />
  ));
