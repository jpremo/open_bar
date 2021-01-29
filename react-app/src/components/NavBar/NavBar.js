import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import picture from "./open_bar_logo.png"
import {setLoginModal, setSignupModal} from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './ModalContainer'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
const NavBar = ({ setAuthenticated }) => {
  const modals = useSelector(state => state.modal)
  const dispatch = useDispatch()
  const openLogin = (e) => {
    dispatch(setLoginModal(true))
    dispatch(setSignupModal(false))
  }
  const openSignup = (e) => {
    dispatch(setSignupModal(true))
    dispatch(setLoginModal(false))
  }
  return (
    <div id="top-nav-bar">
      <ModalContainer hidden={!modals.login} cancel={setLoginModal}>
        <LoginForm setAuthenticated={setAuthenticated}></LoginForm>
        <div className='search-page-link modal-button' onClick={openSignup}> Sign Up</div>
      </ModalContainer>
      <ModalContainer hidden={!modals.signup} cancel={setSignupModal}>
        <SignUpForm setAuthenticated={setAuthenticated}></SignUpForm>
        <div className='search-page-link modal-button' onClick={openLogin}> Log In</div>
      </ModalContainer>
       <NavLink exact to="/">
        <img id="nav-bar-logo-picture" src={picture}/>
         </NavLink>
      <div id="nav-bar-menu">
          <NavLink to="/" exact={true} className="nav-link" activeClassName="active">
            Home
          </NavLink>
          <div to="/login" exact={true} onClick={openLogin} className="nav-link" activeClassName="active">
            Login
          </div>
          <div to="/sign-up" exact={true} onClick={openSignup} className="nav-link" activeClassName="active">
            Sign Up
          </div>
          <NavLink to="/users" exact={true}  className="nav-link" activeClassName="active">
            Users
          </NavLink>
          <LogoutButton setAuthenticated={setAuthenticated} />
      </div>
    </div>
  );
}

export default NavBar;
