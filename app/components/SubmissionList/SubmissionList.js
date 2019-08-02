import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { Clear, Done } from '@material-ui/icons';
import * as PropTypes from 'prop-types';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(10),
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function createData(submissionTime, problemName, verdict) {
  return {
    submissionTime, problemName, verdict
  };
}

const rows = [
  createData('21.3.19 19:02', 'DIY Wooden Ladder', false),
  createData('21.3.19 19:06', 'DIY Wooden Ladder', false),
  createData('21.3.19 19:15', 'DIY Wooden Ladder', true),
  createData('21.3.19 19:45', 'Welfare State', false),
  createData('21.3.19 20:00', 'Welfare State', true),
];

export default function SubmissionList(props) {
  const classes = useStyles();
  const { isOpen } = props;

  return (
    <Paper
      className={clsx(classes.content, classes.root, {
        [classes.contentShift]: isOpen,
      })}
    >
      <Table className={classes.table}>
        <colgroup>
          <col width="30%" />
          <col width="60%" />
          <col width="10%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="left">Submission Time</TableCell>
            <TableCell align="left">Problem Name</TableCell>
            <TableCell align="right">Verdict</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell align="left">{row.submissionTime}</TableCell>
              <TableCell align="left">{row.problemName}</TableCell>
              <TableCell align="right">{row.verdict ? <Done /> : <Clear />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SubmissionList.propTypes = {
  isOpen: PropTypes.bool
};
