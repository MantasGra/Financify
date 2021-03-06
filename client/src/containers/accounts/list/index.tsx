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
  Container,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  getAccounts,
  Account,
  setModalOpen,
  AccountTypes,
  setDeleteId,
  setAccountEditId,
  clearEliminationFormErrors,
  clearAccountFormErrors,
} from 'store/modules/accounts';
import { State } from 'store';
import { useHistory } from 'react-router-dom';
import Routes from 'utils/routes';
import style from './style.module.scss';
import Modal from '../modal';

const Accounts: React.FC = () => {
  const accounts: Account[] = useSelector<State, Account[]>((state) => {
    return Object.keys(state.account.accounts).map(
      (key) => state.account.accounts[key]
    );
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const openModal = (id: number) => {
    dispatch(setModalOpen(true));
    dispatch(setDeleteId(id));
  };

  const handleEdit = (id: number) => {
    dispatch(clearAccountFormErrors());
    dispatch(setAccountEditId(id));
    changeRoute(Routes.AccountEdit);
  };

  const handleCreate = () => {
    dispatch(clearAccountFormErrors());
    dispatch(setAccountEditId(0));
    changeRoute(Routes.AccountCreate);
  };
  const handleCreateEliminating = () => {
    dispatch(clearEliminationFormErrors());
    changeRoute(Routes.EliminateMismatch);
  };

  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };

  return (
    <Container>
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
                    {row.name}
                  </TableCell>
                  <TableCell>{AccountTypes[row.type]}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(row.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openModal(row.id)}>
                      <DeleteIcon className={style.deleteButton} />
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
          onClick={handleCreate}
        >
          <AddIcon />
        </Fab>
        <Fab
          size="large"
          color="secondary"
          variant="extended"
          className={style.eliminateFab}
          onClick={handleCreateEliminating}
        >
          Create eliminating transaction
        </Fab>
        
        
        
        <Modal />
        <Snackbar />
      </div>
    </Container>
  );
};

export default Accounts;
