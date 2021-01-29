import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import picture from "./open_bar_logo.png"

const NavBar = ({ setAuthenticated }) => {
  return (
    <div id="top-nav-bar">
       <NavLink exact to="/">
        <img id="nav-bar-logo-picture" src={picture}/>
         </NavLink>
      <div id="nav-bar-menu">
          <NavLink to="/" exact={true} className="nav-link" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/login" exact={true} className="nav-link" activeClassName="active">
            Log-In
          </NavLink>
          <NavLink to="/sign-up" exact={true} className="nav-link" activeClassName="active">
            Sign-Up
          </NavLink>
          <LogoutButton setAuthenticated={setAuthenticated} />
        
      </div>
    </div>
  );
}

export default NavBar;