import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Example from './containers/example';
import Accounts from './containers/accounts/list';
import AccountCreate from './containers/accounts/form';
import Navbar from './components/navbar';
import Routes from './utils/routes';
import Snackbar from './components/snackbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path={Routes.Home}>
            TODO: Implement home page
          </Route>
          <Route path={Routes.Example}>
            <Example />
          </Route>
          <Route path={Routes.AccountEdit}>
            <AccountCreate />
          </Route>
          <Route path={Routes.AccountCreate}>
            <AccountCreate />
          </Route>
          <Route path={Routes.Accounts}>
            <Accounts />
          </Route>
        </Switch>
      </Container>
      <Snackbar />
    </Router>
  );
};

export default App;
