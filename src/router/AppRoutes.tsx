// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import BasicLayout from "../layouts/BasicLayout";
// import { AboutPage } from "../pages/about/About";
// import { AddContactPage } from "../pages/contact/AddContactPage";
// import { EditContactPage } from "../pages/contact/EditContactPage";
// import { ListContactPage } from "../pages/contact/ListContactsPage";
// import { EditPage } from "../pages/edit/EditPage";
// import { LoginPage } from "../pages/login/LoginPage";
// import { RegisterPage } from "../pages/register/RegisterPage";
// import { checkToken } from "../redux_toolkit/slices/authSlice";
// import { AppDispatch, RootState } from "../redux_toolkit/stores/store";
// import { ProtectedRoutes, redirectMultiplePaths } from "./routerUtils";

// function AppRoutes() {
//   const authInfo = useSelector((state: RootState) => state.auth);

//   const dispatch = useDispatch<AppDispatch>();
//   useEffect(() => {
//     dispatch(checkToken());
//   }, []);
//   if (authInfo.status == "loading") {
//     return <div>SplashScreen</div>;
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         {authInfo.status === "rejected" ? (
//           <>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/about" element={<AboutPage />} />

//             {redirectMultiplePaths(
//               ["/", "/list", "/add", "edit", "/settings"],
//               <Navigate to="/login" />
//             )}
//             <Route path="*" element={<div>Not found</div>} />
//           </>
//         ) : (
//           <Route path="/" element={<ProtectedRoutes />}>
//             <Route index element={<Navigate to="/list" />} />
//             <Route path="/" element={<BasicLayout />}>
//               <Route path="/add" element={<AddContactPage />} />
//               <Route path="/list" element={<ListContactPage />} />
//               <Route path="/edit" element={<EditContactPage />} />
//               <Route path="/settings" element={<EditPage />} />
//               <Route path="/about" element={<AboutPage />} />
//             </Route>
//             {redirectMultiplePaths(
//               ["/login", "register"],
//               <Navigate to="/list" />
//             )}

//             <Route path="*" element={<div>Not found</div>} />
//           </Route>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;

import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import { AboutPage } from "../pages/about/About";
import { AddContactPage } from "../pages/contact/AddContactPage";
import { EditContactPage } from "../pages/contact/EditContactPage";
import { ListContactPage } from "../pages/contact/ListContactsPage";
import { EditPage } from "../pages/edit/EditPage";
import { LoginPage } from "../pages/login/LoginPage";
import { RegisterPage } from "../pages/register/RegisterPage";
import { RootState } from "../redux_toolkit/stores/store";
import { ProtectedRoutes, redirectMultiplePaths } from "./routerUtils";

function AppRoutes() {
  const authInfo = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {authInfo.status === "rejected" ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />

            {redirectMultiplePaths(
              ["/", "/list", "/add", "edit", "/settings"],
              <Navigate to="/login" />
            )}
            <Route path="*" element={<div>Not found</div>} />
          </>
        ) : (
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<Navigate to="/list" />} />
            <Route path="/" element={<BasicLayout />}>
              <Route path="/add" element={<AddContactPage />} />
              <Route path="/list" element={<ListContactPage />} />
              <Route path="/edit" element={<EditContactPage />} />
              <Route path="/settings" element={<EditPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
            {redirectMultiplePaths(
              ["/login", "register"],
              <Navigate to="/list" />
            )}

            <Route path="*" element={<div>Not found</div>} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
