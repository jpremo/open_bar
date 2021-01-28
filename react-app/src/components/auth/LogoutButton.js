import React from "react";
import { logout } from "../../services/auth";
import { removeUser } from '../../store/session'
import { useDispatch } from 'react-redux'

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await logout();
    dispatch(removeUser())
    setAuthenticated(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
