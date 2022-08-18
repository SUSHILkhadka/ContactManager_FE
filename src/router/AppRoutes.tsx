import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import AdminRoute from './AdminRoutes';
import { RegisterPage } from '../pages/register/RegisterPage';
import { LoginPage } from '../pages/login/LoginPage';
import { getLogStatus } from '../services/localStorageAndCookies';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminRoute loggedIn={getLogStatus()} />}>
          <Route path="/home" element={<BasicLayout />}></Route>
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
