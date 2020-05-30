import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Transaction from 'containers/transactions';
import TransactionForm from 'containers/transactions/components/form';
import Accounts from './containers/accounts/list';
import AccountForm from './containers/accounts/form';
import Tendencies from './containers/transactions/components/tendencies';
import Navbar from './components/navbar';
import Routes from './utils/routes';
import Snackbar from './components/snackbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={Routes.Home}>
          TODO: Implement home page
        </Route>
        <Route path={[Routes.TransactionsCreate, Routes.TransactionsEdit]}>
          <TransactionForm />
        </Route>
        <Route path={Routes.Transactions}>
          <Transaction />
        </Route>
        <Route path={[Routes.AccountCreate, Routes.AccountEdit]}>
          <AccountForm />
        </Route>
        <Route path={Routes.Accounts}>
          <Accounts />
        </Route>
        <Route path={Routes.Tendencies}>
          <Tendencies />
        </Route>
      </Switch>
      <Snackbar />
    </Router>
  );
};

export default App;
