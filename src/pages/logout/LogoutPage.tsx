import { message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { makeLoggedOut } from '../../redux_toolkit/slices/authSlice';
import { logout } from '../../services/backendCallUser';
import { saveAccessToken, saveLoginResponse, saveRefreshToken, setLogStatus } from '../../services/localStorage';

export const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(makeLoggedOut());

    try {
      const res = await logout();
      setLogStatus(false);
      saveLoginResponse('');
      saveAccessToken('');
      saveRefreshToken('');
      navigate('/login', { replace: true });
    } catch (e) {
      message.error('couldnot logout');
    }
  };
  return (
    <div>
      <button onClick={handleLogout} className="btn">
        LOGOUT
      </button>
    </div>
  );
};
