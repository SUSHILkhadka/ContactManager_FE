import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { RootState } from '../../redux_toolkit/stores/store';

export const HomePage = () => {
  const authInfo = useSelector((state: RootState) => state.auth);

  return (
    <div>
      Home Page
      <div>authInfo.id={authInfo.id}</div>
      <div>authInfo.username={authInfo.username}</div>
      <div>authInfo.email = {authInfo.email}</div>
      <div>authInfo.accessToken = {authInfo.accessToken}</div>
      <div>authInfo.refreshToken = {authInfo.refreshToken}</div>
    </div>
  );
};
