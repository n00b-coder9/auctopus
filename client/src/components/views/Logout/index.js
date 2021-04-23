import { Redirect } from 'react-router';
import { logoutUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import React from 'react';
const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logoutUser());
  return (
    <Redirect to='/home'/>
  );
};

export default Logout;
