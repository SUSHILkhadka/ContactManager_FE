import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import AdminRoute from '../layouts/AdminRoutes';
import { RegisterPage } from '../pages/register/RegisterPage';
import { LoginPage } from '../pages/login/LoginPage';
import { HomePage } from '../pages/home/HomePage';
import { useSelector } from 'react-redux';
import { getLogStatus } from '../services/localStorage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminRoute loggedIn={getLogStatus()} />}>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
