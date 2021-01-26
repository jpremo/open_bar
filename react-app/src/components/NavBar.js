import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated }) => {
  return (
    <div id="top-nav-bar">
      <ul>
          <NavLink to="/" exact={true} className="nav-link" activeClassName="active">
            Home
          </NavLink>
       
          <NavLink to="/login" exact={true} className="nav-link" activeClassName="active">
            Login
          </NavLink>
    
          <NavLink to="/sign-up" exact={true} className="nav-link" activeClassName="active">
            Sign Up
          </NavLink>
     
          <NavLink to="/users" exact={true}  className="nav-link" activeClassName="active">
            Users
          </NavLink>
       
          <LogoutButton setAuthenticated={setAuthenticated} />
      </ul>
    </div>
  );
}

export default NavBar;