import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';
import Container from '@material-ui/core/Container';
import Routes from 'utils/routes';
import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useHistory } from 'react-router-dom';

const getReports = () => [
  {
    name: 'Monthly expenses report',
    route: Routes.MonthlyExpensesReport,
    icon: <TimelineIcon />,
  },
  {
    name: 'Expenses by category report',
    route: '1',
    icon: <PieChartIcon />,
  },
  {
    name: 'Balance changes report',
    route: '2',
    icon: <BarChartIcon />,
  },
];

const Reports: React.FC = () => {
  const history = useHistory();
  const changeRoute = (route: string) => {
    if (route.length > 1) {
      history.push(route);
    }
  };
  return (
    <Container>
      <List>
        {getReports().map((report) => (
          <ListItem
            button
            key={report.route}
            onClick={() => changeRoute(report.route)}
          >
            <ListItemIcon>{report.icon}</ListItemIcon>
            <ListItemText>{report.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Reports;
