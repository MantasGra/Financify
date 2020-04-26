import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Example from './containers/example';
import Navbar from './components/navbar';
import Routes from './utils/routes';
import Transaction from 'containers/transactions';
import TransactionCreate from 'containers/transactions/components/form';

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
        <Route path={Routes.TransactionsCreate}>
          <TransactionCreate />
        </Route>
        <Route path={Routes.Transactions}>
          <Transaction />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
