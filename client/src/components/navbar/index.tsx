import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Routes from '../../utils/routes';

const Navbar: React.FC = () => {
  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => changeRoute(Routes.Home)}>
          Home
        </Button>
        <Button color="inherit" onClick={() => changeRoute(Routes.Example)}>
          Example
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
