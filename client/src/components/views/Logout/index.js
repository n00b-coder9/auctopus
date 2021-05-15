import { Redirect } from 'react-router';
import { logoutUser } from '../../../redux/_actions/user_actions';
import { useDispatch } from 'react-redux';
import React from 'react';
const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logoutUser());
  return (
    <Redirect to='/'/>
  );
};

export default Logout;
