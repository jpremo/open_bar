import React, {useRef} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import picture from "./open_bar_logo.png"
import { setLoginModal, setSignupModal, setIncompleteModal, setTextModal, setCreateBarModal } from '../../store/modal'
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './ModalContainer'
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import IncompleteForm from '../auth/IncompleteForm'
import TextForm from '../auth/TextForm'
import CreateBarForm from "../UserProfile/CreateBar"
import Modal from './ModalContainer';
const NavBar = ({ setAuthenticated }) => {
  const modals = useSelector(state => state.modal)
  const user = useSelector(state => state.session.user)
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
    <>
      <div id="top-nav-bar">
        <ModalContainer hidden={!modals.login} cancel={setLoginModal}>
          <LoginForm setAuthenticated={setAuthenticated}></LoginForm>
        </ModalContainer>
        <ModalContainer hidden={!modals.signup} cancel={setSignupModal}>
          <SignUpForm setAuthenticated={setAuthenticated}></SignUpForm>
        </ModalContainer>
        <ModalContainer hidden={!modals.incomplete} cancel={setIncompleteModal}>
          <IncompleteForm></IncompleteForm>
        </ModalContainer>
        <ModalContainer hidden={!modals.text} cancel={setTextModal}>
          <TextForm></TextForm>
        </ModalContainer>
        <ModalContainer hidden={!modals.createbar} cancel={setCreateBarModal}>
          <CreateBarForm />
        </ModalContainer>
        <NavLink exact to="/">
          <img id="nav-bar-logo-picture" src={picture} alt='' />
        </NavLink>
        <div id="nav-bar-menu">
          <NavLink to="/" exact={true} className="search-page-link nav-link" activeClassName="active">
            Home
          </NavLink>
          {!user.id &&
            <>
              <div to="/login" exact={true} onClick={openLogin} className="search-page-link nav-link" activeClassName="active">
                Login
          </div>
              <div to="/sign-up" exact={true} onClick={openSignup} className="search-page-link nav-link" activeClassName="active">
                Sign Up
          </div>
            </>
          }

          {user.id && <>
            <NavLink to={`/users/${user.id}`} exact={true} className="search-page-link nav-link" activeClassName="active">
              Profile
        </NavLink>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </>}

        </div>
      </div>
      <div id='nav-bar-spacer' style={{ height: `81px` }}></div>
    </>
  );
}

export default NavBar;
