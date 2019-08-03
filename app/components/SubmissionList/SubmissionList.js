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
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from '../LoadingIndicator';

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

export default function SubmissionList(props) {
  const classes = useStyles();
  const { isOpen, submissions } = props;

  const rows = submissions.map((submission) => createData(submission.submissionTime, submission.problemName, submission.verdict));

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
            <TableCell align="left">Submission No</TableCell>
            <TableCell align="left">Problem Name</TableCell>
            <TableCell align="right">Verdict</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell align="left">{row.submissionTime + 1}</TableCell>
              <TableCell align="left">{row.problemName}</TableCell>
              <TableCell align="right">
                {/* eslint-disable-next-line no-nested-ternary */}
                {row.verdict == null
                  ? <CircularProgress size={18} className={classes.progress} />
                  : (row.verdict ? <Done /> : <Clear />)
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SubmissionList.propTypes = {
  isOpen: PropTypes.bool,
  submissions: PropTypes.array
};
