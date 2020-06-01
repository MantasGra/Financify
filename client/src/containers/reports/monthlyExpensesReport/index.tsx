import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'store';
import { ExpensesReport, getExpensesReport } from 'store/modules/reports';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import style from './style.module.scss';

const MonthlyExpensesReport: React.FC = () => {
  const data: ExpensesReport[] = useSelector<State, ExpensesReport[]>(
    (state) => state.reports.expensesReport
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getExpensesReport());
  }, [dispatch]);
  return (
    <Container>
      <div className={style.chartContainer}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expenses" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <TableContainer className={style.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell align="right">Expenses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice()
              .reverse()
              .map((entry) => (
                <TableRow key={entry.month}>
                  <TableCell>{entry.month}</TableCell>
                  <TableCell align="right">{entry.expenses}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MonthlyExpensesReport;
