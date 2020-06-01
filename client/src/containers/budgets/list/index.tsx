import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
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
import Button from '@material-ui/core/Button';
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

  const handleCreate = () => {
    changeRoute(Routes.BudgetsCreate);
  };

  const handleRecommendedBudgetsButtonClick = () => {
    changeRoute(Routes.RecommendedBudgets);
  };
  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };

  const resolveProgressionValue = (row: Budget) => {
    if (!row.usedAmount) return 0;
    if (row.usedAmount > row.amount) return 100;
    return (row.usedAmount / row.amount) * 100;
  };

  return (
    <Container>
      <div className={style.title}>
        <h1>Your Budgets</h1>
        <Button
          variant="contained"
          color="primary"
          className={style.budgetButton}
          onClick={handleRecommendedBudgetsButtonClick}
        >
          Recommended budgets
        </Button>
      </div>
      <div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            {budgets.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{TransactionCategories[row.category]}</TableCell>
                <TableCell>
                  {new Date(row.dateFrom).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(row.dateTo).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {row.usedAmount && row.usedAmount < 0 ? (0).toFixed(2) : row.usedAmount?.toFixed(2)} used out of{' '}
                  {row.amount.toFixed(2)}
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={resolveProgressionValue(row)}
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
