import { Outlet, Navigate } from 'react-router-dom';
import { getLogStatus } from '../services/localStorageAndCookies';


export default function AdminRoute() {
  return getLogStatus() ? <Outlet /> : <Navigate to="/login" />;
}
