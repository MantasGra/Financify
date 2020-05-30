import React from 'react';
import {LineChart,XAxis,CartesianGrid,Tooltip,Legend,Line,YAxis} from 'recharts';
import style from './style.module.scss';
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
import { useSelector, useDispatch } from 'react-redux';


const Tend: React.FC = () => {
  const tendencies = useSelector<State, Tendency[]>((state) =>
  Object.keys(state.reports.tendencies).map(
    (key) => state.reports.tendencies[key]
  )
);

const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTendencies());
  }, [dispatch]);

  tendencies.forEach(tendency => {
    tendency.date = tendency.date.toString().substr(0,4) +  tendency.date.toString().substr(4,3)
    tendency.amount = Number (tendency.amount.toFixed(2))
    tendency.coeficient = Number (tendency.coeficient.toFixed(5))
  });

  const data = tendencies;
  return (
    <div className={style.title}>
    <h1>Your Tendencies</h1>
 
    <Container>
    <LineChart width={1200} height={400} data={data}
      margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="date" />
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
     
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
            {tendencies.map((row) => (       
                <TableRow key={row.date.toString()}>
                  <TableCell component="th" scope="row">                  
                    { row.date} 
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.amount}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.coeficient}
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