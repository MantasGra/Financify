import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Transaction from 'containers/transactions';
import TransactionForm from 'containers/transactions/components/form';
import Accounts from './containers/accounts/list';
import AccountForm from './containers/accounts/form';
import Tendencies from './containers/tendencies';
import Reports from './containers/reports';
import MonthlyExpensesReport from './containers/reports/monthlyExpensesReport';
import CurrencySubscriptions from './containers/currencySubscriptions/list';
import CurrencySubscriptionForm from './containers/currencySubscriptions/form';
import Navbar from './components/navbar';
import Routes from './utils/routes';
import Snackbar from './components/snackbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={Routes.Home}>
          <Container>
            <h1>Home page</h1>
          </Container>
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
        <Route exact path={Routes.Reports}>
          <Reports />
        </Route>
        <Route exact path={Routes.MonthlyExpensesReport}>
          <MonthlyExpensesReport />
        </Route>
        <Route exact path={Routes.CurrencySubscriptions}>
          <CurrencySubscriptions />
        </Route>
        <Route path={Routes.CurrencySubscriptionCreate}>
          <CurrencySubscriptionForm />
        </Route>
      </Switch>
      <Snackbar />
    </Router>
  );
};

export default App;
