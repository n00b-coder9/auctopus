import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  cells: {
    flex: 1,
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  let user = useSelector((state) => state.user);
  if (user) {
    user = user.userData;
  }
  return (
    <div className={classes.main}>
      <p>Table</p>
      <p>Graph_1</p>
      <p>Graph_2</p>
    </div>
  );
};

export default Dashboard;
