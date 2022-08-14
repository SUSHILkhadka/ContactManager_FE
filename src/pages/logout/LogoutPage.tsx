import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { makeLoggedOut } from "../../redux_toolkit/slices/authSlice";
import { saveAccessToken, saveLoginResponse, saveRefreshToken, setLogStatus } from "../../services/localStorage";

export const LogoutPage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const handleLogout=()=>{
        dispatch(makeLoggedOut());

        setLogStatus(false);
        saveLoginResponse('');
        saveAccessToken('');
        saveRefreshToken('');
        navigate('/login', { replace: true });
    }

  return (
    <div>
      <button onClick={handleLogout}>LOGOUT
      </button>
    </div>
  );
};