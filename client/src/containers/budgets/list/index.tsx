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
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getBudgets, Budget } from 'store/modules/budgets';
import { TransactionCategories } from 'store/modules/transactions';
import { State } from 'store';
import { useHistory } from 'react-router-dom';
import Routes from 'utils/routes';
import style from './style.module.scss';

const Budgets: React.FC = () => {
  const budgets: Budget[] = useSelector<State, Budget[]>((state) => {
    return Object.keys(state.budget.budgets).map(
      (key) => state.budget.budgets[key]
    );
  });

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBudgets());
  }, [dispatch]);

  // const handleEdit = (id: number) => {
  //   dispatch(setAccountEditId(id));
  //   changeRoute(Routes.AccountEdit);
  // };

  const handleCreate = () => {
    // dispatch(setAccountEditId(0));
    // changeRoute(Routes.AccountCreate);
  };

  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };

  return (
    <Container>
      <div className={style.title}>
        <h1>Your Budgets</h1>
      </div>
      <div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            {budgets.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{TransactionCategories[row.category]}</TableCell>
                <TableCell>
                  {row.usedAmount} used out of {row.amount}
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={row.usedAmount / row.amount * 100}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <DeleteIcon className={style.deleteButton} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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
        <Snackbar />
      </div>
    </Container>
  );
};

export default Budgets;
