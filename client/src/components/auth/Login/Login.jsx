import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm/LoginForm';

const Login = ({ setHeader }) => {
  setHeader('LOGIN');
  return (
    <section class="hero is-fullheight is-medium is-primary is-bold">
      <LoginForm />
    </section>
  );
};

Login.propTypes = {
  setHeader: PropTypes.func.isRequired,
};

export default Login;
