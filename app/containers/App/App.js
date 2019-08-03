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
import { SnackbarProvider } from 'notistack';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import './style.scss';
import { ToastContainer } from 'react-toastify';
import Questions from '../Questions';
import SubmitCode from '../SubmitCode';
import Contests from '../Contests';
import ProblemStatement from '../ProblemStatement/ProblemStatement';
import Submissions from '../Submissions';
import Leaderboard from '../Leaderboard';
import Admin from '../Admin';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - React.js Boilerplate"
      defaultTitle="DCode"
    >
      <meta name="description" content="A React.js Boilerplate application" />
    </Helmet>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <Switch>
        <Route exact path="/" component={Contests} />
        <Route path="/:contestId/problems/:problemId" component={ProblemStatement} />
        <Route path="/:contestId/problems" component={Questions} />
        <Route path="/:contestId/submissions" component={Submissions} />
        <Route path="/:contestId/leaderboard" component={Leaderboard} />
        <Route path="/:contestId/submit" component={SubmitCode} />
        <Route path="/createContest" component={Admin} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </SnackbarProvider>
  </div>
);

export default App;
