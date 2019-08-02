/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './style.scss';
import Questions from '../Questions';
import SubmitCode from '../SubmitCode';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="DCode"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/features" component={FeaturePage} />
      <Route path="/problems" component={Questions} />
      <Route path="/submit" component={SubmitCode} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;