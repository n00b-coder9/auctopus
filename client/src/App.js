/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
// import { makeStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
// pages for this product
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage';
import RegisterPage from './components/views/RegisterPage';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import Navigation from './components/Navigation';
import Logout from './components/views/Logout';
import Dashboard from './components/views/DashboardPage';
import DetailProductPage from './components/views/DetailProductPage/DetailProductPage';
import CardContainer from './components/views/LandingPage/Cards/CardContainer';
import Snackbar from './components/common/Snackbar';
import setIsSnackbarOpen from './_actions/snackbar_actions';
import _ from 'underscore';
// Styles for the whole App
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '1 0 auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flex: 1,
    padding: theme.spacing(3),
  },
}));
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => state.snackbar, _.isEqual);
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className={classes.root}>
        <Navigation />

        <main
          className={classes.content}>
          <div className={classes.toolbar} />

          {/* App content starts here */}
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/dashboard' component={Auth(Dashboard)} />
            <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
            <Route exact path="/product/:productId" component={Auth(DetailProductPage, true)} />
            <Route exact path="/cards" component={CardContainer} />
            <Route exact path='/product/:productid' component={Auth(DetailProductPage, true)} />
          </Switch>
        </main>
        {/* App wide single snackbar */}
        <Snackbar
          open={snackbarState.isOpen}
          message={snackbarState.message}
          severity={snackbarState.severity}
          onClose={
            () => dispatch(setIsSnackbarOpen({ isOpen: false }))
          } />
      </div>
    </Suspense>
  );
}

export default App;
