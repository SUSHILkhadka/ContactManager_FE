import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { checkToken, makeLoggedOut } from "../redux_toolkit/slices/authSlice";
import { AppDispatch, RootState } from "../redux_toolkit/stores/store";
import { getRefreshToken } from "../services/localStorageAndCookies";

// export const ProtectedRoutes = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!Boolean(getRefreshToken())) {
//       dispatch(makeLoggedOut());
//     }
//   }, [navigate]);
//   return Boolean(getRefreshToken()) ? <Outlet /> : <Navigate to="/login" />;
// };
export const ProtectedRoutes = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(checkToken());
  }, [navigate]);
  if (authInfo.status == "loading") {
    return <div>SplashScreen</div>;
  }
  return authInfo.status==="fulfilled" ? <Outlet /> : <Navigate to="/login" />;
};


export const redirectMultiplePaths = (paths: string[], element: JSX.Element) =>
  paths.map((path: string) => (
    <Route key={path} path={path} element={element} />
  ));
