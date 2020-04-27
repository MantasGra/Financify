import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Example from './containers/example';
import Accounts from './containers/accounts/list';
import AccountCreate from './containers/accounts/form';
import Navbar from './components/navbar';
import Routes from './utils/routes';
import Transaction from 'containers/transactions';
import TransactionCreate from 'containers/transactions/components/form';
import TransactionMore from 'containers/transactions/components/more';
import TransactionEdit from 'containers/transactions/components/edit';
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
        <Route path={Routes.TransactionsMore}>
          <TransactionMore />
        </Route>
        <Route path={Routes.TransactionsEdit}>
          <TransactionEdit />
        </Route>
        <Route path={Routes.Transactions}>
          <Transaction />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
