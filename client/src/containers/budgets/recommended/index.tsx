import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Snackbar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {
  Budget,
  getRecommendedBudgets,
  createBudget,
  BudgetFormType,
} from 'store/modules/budgets';
import { TransactionCategories } from 'store/modules/transactions';
import { State } from 'store';
import { useHistory } from 'react-router-dom';
import Routes from 'utils/routes';
import style from './style.module.scss';

const RecommendedBudgets: React.FC = () => {
  const budgets: Budget[] = useSelector<State, Budget[]>((state) => {
    return Object.keys(state.budget.recommendedBudgets).map(
      (key) => state.budget.recommendedBudgets[key]
    );
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRecommendedBudgets());
  }, [dispatch]);

  const history = useHistory();

  const changeRoute = (route: string) => {
    history.push(route);
  };

  const handleBackButtonClick = () => {
    changeRoute(Routes.Budgets);
  };

  const handleAddBudget = (payload: BudgetFormType) => {
    dispatch(
      createBudget({
        budgetForm: payload,
        callback: () => changeRoute(Routes.Budgets),
      })
    );
  };

  return (
    <Container>
      <div className={style.title}>
        <h1>Recommended Budgets</h1>
        <Button
          variant="contained"
          color="primary"
          className={style.budgetButton}
          onClick={handleBackButtonClick}
        >
          Back to list
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
                <TableCell>Amount</TableCell>
                <TableCell />
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
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddBudget(row as BudgetFormType)}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
        <Snackbar />
      </div>
    </Container>
  );
};

export default RecommendedBudgets;
