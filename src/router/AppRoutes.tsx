import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BasicLayout } from '../layouts/BasicLayout';
import AdminRoute, { AdminRoute2 } from '../layouts/AdminRoutes';
import { RegisterPage } from '../pages/register/RegisterPage';
import { LoginPage } from '../pages/login/LoginPage';
import { HomePage } from '../pages/home/HomePage';
import { AddContactPage } from '../pages/contact/AddContactPage';
import { ListContactPage } from '../pages/contact/ListContactsPage';
import { AboutPage } from '../pages/about/About';
import {  useSelector } from 'react-redux';
import { LogoutPage } from '../pages/logout/LogoutPage';
import { EditContactPage } from '../pages/contact/EditContactPage';
import { EditPage } from '../pages/edit/EditPage';

function AppRoutes() {
  const authInfo = useSelector((state: any) => state.auth);
  return (
      <BrowserRouter>
        <div className="app-name">CONTACT MANAGEMENT APP</div>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route path="/" element={<AdminRoute loggedIn={authInfo.login} />}>
              <Route index element={<HomePage />} />
              <Route path="/contact/add" element={<AddContactPage />} />
              <Route path="/contact/list" element={<ListContactPage />} />
              <Route path="/contact/edit" element={<EditContactPage />} />
              <Route path="/about" element={<AboutPage/>} />
              <Route path="/edit" element={<EditPage/>} />
              <Route path="/logout" element={<LogoutPage/>} />
            </Route>
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<AdminRoute2 loggedIn={authInfo.login} />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </BrowserRouter>
  );
}

export default AppRoutes;
