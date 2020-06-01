import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Routes from '../../utils/routes';
import style from './style.module.scss';

const Navbar: React.FC = () => {
  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Grid container direction="row">
            <Button color="inherit" onClick={() => changeRoute(Routes.Home)}>
              Home
            </Button>
            <Divider className={style.AppBar__Divider} orientation="vertical" />
            <Button
              color="inherit"
              onClick={() => changeRoute(Routes.Accounts)}
            >
              Accounts
            </Button>
            <Divider className={style.AppBar__Divider} orientation="vertical" />
            <Button
              color="inherit"
              onClick={() => changeRoute(Routes.Transactions)}
            >
              Transactions
            </Button>
            <Divider className={style.AppBar__Divider} orientation="vertical" />
            <Button
              color="inherit"
              onClick={() => changeRoute(Routes.CurrencySubscriptions)}
            >
              Curency subscriptions
            </Button>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
