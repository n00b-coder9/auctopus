import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
import { makeStyles } from '@material-ui/core';
// pages for this product
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import Navigation from './components/Navigation';
import Logout from './components/views/Logout';
import Dashboard from './components/views/DashboardPage';

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
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
}));
function App() {
  const classes = useStyles();
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
          </Switch>
        </main>
      </div>
    </Suspense>
  );
}

export default App;
