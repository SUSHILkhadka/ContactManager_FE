import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const BasicLayout = () => {
  const Styling = (prop: { isActive: boolean }) => {
    const { isActive } = prop;
    return { color: isActive ? "blue" : "black" };
  };
  return (
    <div className="app">
      <div className="navbar">
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
        <NavLink style={Styling} to={"/edit"}>
          Edit
        </NavLink>
        <NavLink style={Styling} to={"/logout"}>
          logout
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
