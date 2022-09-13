import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
import { RootState } from "../redux_toolkit/stores/store";
import { getRefreshToken } from "../services/localStorageAndCookies";

export const ProtectedRoutes = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  return !(getRefreshToken() === "") ? <Outlet /> : <Navigate to="/login" />;
};

//login and register route are redirected to home, if user is logged in.
export const redirectMultiplePaths = (
  paths: string[],
  element: JSX.Element
) =>
  paths.map((path: string) => (
    <Route key={path} path={path} element={element} />
  ));
