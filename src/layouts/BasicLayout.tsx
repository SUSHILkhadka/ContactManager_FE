import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const BasicLayout = () => {
  const Styling = (prop: { isActive: boolean }) => {
    const { isActive } = prop;
    return { color: isActive ? "red" : "blue" };
  };
  return (
    <div>
      <div style={{ display: "flex", gap: "15px" }}>
        <NavLink style={Styling} to={"/"}>
          Home
        </NavLink>
        <NavLink style={Styling} to={"/about"}>
          About
        </NavLink>
        <NavLink style={Styling} to={"/contact/add"}>
          Add New Contacts
        </NavLink>
        <NavLink style={Styling} to={"/contact/list"}>
          List My Contacts
        </NavLink>
        <NavLink style={Styling} to={"/logout"}>
          logout
        </NavLink>
        <NavLink style={Styling} to={"/login"}>
          Login
        </NavLink>
        <NavLink style={Styling} to={"/register"}>
          Register
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
