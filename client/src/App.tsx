import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Example from './containers/example';
import Navbar from './components/navbar';
import Routes from './utils/routes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={Routes.Home}>
          TODO: Implement home page
        </Route>
        <Route path={Routes.Example}>
          <Example />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
