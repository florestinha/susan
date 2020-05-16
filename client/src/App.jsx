import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';

import Login from './components/auth/Login/Login';
import PasswordForgot from './components/auth/PasswordForgot/PasswordForgot';
import PasswordReset from './components/auth/passwordReset/PasswordReset';

import {
  GardenerListPage,
  GardenerDetailsPage,
  GardenerCreatePage,
  GardenerEditPage,
} from './pages/Gardener';

import {
  PlantListPage,
  PlantCreatePage,
  PlantEditPage,
  PlantDetailsPage,
} from './pages/Plant';

import { LoggedUserProfilePage } from './pages/User';

const App = () => {
  const [header, setHeader] = useState('HOME');
  const setNewHeader = newHeader => (newHeader !== header) && setHeader(newHeader);
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/profile"
          render={props => <LoggedUserProfilePage {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/gardeners"
          render={props => <GardenerListPage {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/gardener-details"
          render={props => <GardenerDetailsPage {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/gardener-edit"
          render={props => <GardenerEditPage {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/signup"
          render={props => <GardenerCreatePage {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} setHeader={setNewHeader} />}
        />

        <Route
          exact
          path="/plant-list"
          render={props => <PlantListPage {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/plant-create"
          render={props => <PlantCreatePage {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/plant-edit/:id"
          render={props => <PlantEditPage {...props} setHeader={setNewHeader} />}
        />
        <Route
          exact
          path="/plant-details/:id"
          render={props => <PlantDetailsPage {...props} setHeader={setNewHeader} />}
        />

        <Route exact path="/forgot" component={PasswordForgot} />
        <Route exact path="/reset/:token" component={PasswordReset} />
      </Switch>
    </div>
  );
};

export default App;
