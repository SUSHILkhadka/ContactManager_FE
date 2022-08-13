import { Outlet, Navigate } from "react-router-dom";

type Props = {
  loggedIn: string | null;
}

export default function AdminRoute(props: Props) {
  return (
    props.loggedIn ? <Outlet /> : <Navigate to="/login" />
  )
}
export  function AdminRoute2(props: Props) {
    return (
      props.loggedIn ? <Navigate to="/" />:  <Outlet />
    )
  }