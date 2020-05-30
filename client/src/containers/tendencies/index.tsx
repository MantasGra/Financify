import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  LineChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  YAxis,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from '@material-ui/core';
import { Tendency, getTendencies } from 'store/modules/reports';
import { State } from 'store';
import moment from 'moment';
import style from './style.module.scss';

interface IState {
  data: Array<{
    date: string;
    amount: number;
    coefficient: number;
  }>
}




const Tend: React.FC = () => {
  const tendencies = useSelector<State, Tendency[]>((state) =>
    Object.keys(state.reports.tendencies).map(
      (key) => state.reports.tendencies[key]
    )
  );
  const [state, setState] = React.useState<IState>({ data: [] });

  React.useEffect(() => {
    if (tendencies) {
      setState({
        data: tendencies.map((tendency) => ({
          date: moment(tendency.date).format('YYYY-MM'),
          amount: Number(tendency.amount.toFixed(2)),
          coefficient: Number(tendency.coeficient.toFixed(5))
        }))
      });
    }
  }, [tendencies]);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTendencies());
  }, [dispatch]);



  
  return (
    <div className={style.title}>
      <h1>Your Tendencies</h1>

      <Container>
        <LineChart
          width={1200}
          height={400}
          data={state.data}
          margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Coefficient</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.data.map((row) => (
                <TableRow key={row.date.toString()}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.coefficient}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Tend;
