import { Outlet, Navigate } from 'react-router-dom';

type Props = {
  loggedIn: boolean;
};

export default function AdminRoute(props: Props) {
  return props.loggedIn ? <Outlet /> : <Navigate to="/login" />;
}
