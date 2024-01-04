import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="nav-wrapper">
      <div id="logo-name-holder">
        <NavLink id="nav-home-link" exact to="/">
          <img
            id="nav-logo"
            src="https://i.ibb.co/g7S0xLw/readinglogo-Photo-Room.png"
            alt="readinglogo"
            border="0"
          />{" "}
        </NavLink>
        <span>PhoenixReader</span>
      </div>
      <div>{isLoaded && <ProfileButton user={sessionUser} />}</div>
    </div>
  );
}

export default Navigation;
