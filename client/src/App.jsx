import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home/HomePage';
import ProducerCreatePage from './pages/Producer/ProducerCreatePage/ProducerCreatePage';
import ProducerDetailsPage from './pages/Producer/ProducerDetailsPage/ProducerDetailsPage';

import './sass/App.scss';

const App = () => (
  <div
    className='container mx-auto bg-white'
    style={{
      padding: '75px 0px',
      minHeight: '100vh',
    }}
  >
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/producer-create'>
        <ProducerCreatePage />
      </Route>
      <Route exact path='/producer/:producerId'>
        <ProducerDetailsPage />
      </Route>
      {/* <Route exact path='/forgot' component={PasswordForgot} />
      <Route exact path='/reset/:token' component={PasswordReset} /> */}
      <Route>
        Not found
      </Route>
    </Switch>
  </div>
);

export default App;
