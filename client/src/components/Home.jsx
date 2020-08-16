import React from 'react';
import PropTypes from 'prop-types';

import 'react-bulma-components/dist/react-bulma-components.min.css';

const Home = ({ setHeader }) => {
  setHeader('HOME');
  return (
    <section class="hero is-success is-fullheight">
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a href="/" class="navbar-item is-active">
                <h1 class="title">
                  Susan
                </h1>
              </a>
              <span class="navbar-burger burger" data-target="navbarMenuHeroC">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroC" class="navbar-menu">
              <div class="navbar-end">
                <a href="/" class="navbar-item is-active">
                  Home
                </a>
                <a href="/" class="navbar-item">
                  Logout
                </a>
                <span class="navbar-item">
                  <a href="/" class="button is-success is-inverted">
                    <span class="icon">
                      <i class="fab fa-github"></i>
                    </span>
                    <span>Download</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>

        <div class="tile is-ancestor">
          <div class="tile is-vertical is-8">
            <div class="tile is-parent">
              <article class="tile is-child notification is-primary">

                <div class="container has-text-centered">
                  <h1 class="title has-text-black">
                    Map
                  </h1>
                </div>
 
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-light">
              <div class="content">
                <p class="title has-text-black">Spots</p>
              </div>
            </article>
          </div>
        </div>

      <div class="hero-foot is-danger">
      </div>
    </section>
  );
};

Home.propTypes = {
  setHeader: PropTypes.func.isRequired,
};

export default Home;
