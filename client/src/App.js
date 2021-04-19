/* eslint-disable new-cap */
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
// pages for this product
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
