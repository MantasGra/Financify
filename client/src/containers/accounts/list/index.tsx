import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fab,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getAccounts, AccountType, setModalOpen } from 'store/modules/accounts';
import { State } from 'store';
import { useHistory } from 'react-router-dom';
import style from './style.module.scss';
import Routes from '../../../utils/routes';
import Modal from '../modal';

const Accounts: React.FC = () => {
  const accounts: AccountType[] = useSelector<State, AccountType[]>((state) => {
    return Object.keys(state.account.accounts).map(
      (key) => state.account.accounts[key]
    );
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const openModal = () => {
    dispatch(setModalOpen(true));
  };

  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };
  // Select the random fact from redux state.
  return (
    <div className={style.row}>
      <div className={style.column}>
        <div className={style.title}>
          <h1>Your Accounts</h1>
        </div>
        <div>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={openModal}>
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Fab
            size="medium"
            color="secondary"
            aria-label="add"
            className={style.fab}
            onClick={() => changeRoute(Routes.AccountCreate)}
          >
            <AddIcon />
          </Fab>
          <Modal />
          <Snackbar />
        </div>
      </div>
    </div>
  );
};

export default Accounts;
