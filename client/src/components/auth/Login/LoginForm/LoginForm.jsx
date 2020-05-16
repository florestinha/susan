import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import fetchLogin from '../../../../helpers/fetchLogin';
import validator from './LoginFormValidator';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';
import { Input } from 'react-bulma-components/lib/components/form';

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validation, setValidation] = useState(validator.valid());

  const validateAndLogin = async () => {
    const newValidation = validator.validate({
      email,
      password,
    });
    if (newValidation.isValid) {
      const { success, message } = await fetchLogin(email, password);
      if (success) {
        history.push('/profile');
      } else {
        setErrorMessage(message);
        setValidation(newValidation);
      }
    } else setValidation(newValidation);
  };

  return (
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <article>
            <h1 class="title has-text-centered is-size-2">Susan</h1>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required autofocus
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                {email ?
                  validation.email.isInvalid ?
                    <span class="icon is-small is-right">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  :
                    <span class="icon is-small is-right">
                      <i class="fas fa-check"></i>
                    </span>
                : null}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <Input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                {password ?
                  validation.password.isInvalid ?
                    <span class="icon is-small is-right">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  :
                    <span class="icon is-small is-right">
                      <i class="fas fa-check"></i>
                    </span>
                : null}
              </p>
            </div>
            <div class="field is-grouped">
              <p class="control is-expanded">
                <input type="checkbox" id="checkbox" class="regular-checkbox" />
                  <label for="checkbox"></label>
                  <span class="title is-size-6"> Remember</span>
              </p>
              <p class="control is-expanded has-text-centered">
                <Link
                  class="title is-size-6"
                  to="/forgot"
                >
                  Forgot it
                </Link>
              </p>
              <p class="control is-expanded has-text-right">
                <Link
                  class="title is-size-6"
                  to="/forgot"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <Button class="button is-primary is-inverted is-outlined"
                  name="login-button"
                  onClick={validateAndLogin}
                >
                  Login
                </Button>
              </p>
            </div>
            <div className="text-danger my-1">
              { errorMessage }
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
