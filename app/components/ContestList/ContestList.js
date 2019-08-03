import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

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

function createData(contestId, contestName, contestDate, numParticipants, registered) {
  return {
    contestId, contestName, contestDate, numParticipants, registered
  };
}

function ContestList(props) {
  const classes = useStyles();
  const {
    isOpen, contests, onClick, enqueueSnackbar, registerContest
  } = props;

  const rows = contests.map((contest) => createData(contest.id, contest.name, contest.date, contest.participants, contest.registered));

  const handleClick = (row) => {
    if (row.registered) {
      onClick(row.contestId);
    } else {
      enqueueSnackbar('You have to register for the contest');
    }
  };

  return (
    <Paper
      className={clsx(classes.content, classes.root, {
        [classes.contentShift]: isOpen,
      })}
    >
      <Table className={classes.table}>
        <colgroup>
          <col width="40%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell align="left">Contest Name</TableCell>
            <TableCell align="left">Contest Date</TableCell>
            <TableCell align="left">Number of Participants</TableCell>
            <TableCell align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name} key={index} hover onClick={() => handleClick(row)} style={{ cursor: 'pointer' }}>
              <TableCell align="left">{row.contestName}</TableCell>
              <TableCell align="left">{row.contestDate}</TableCell>
              <TableCell align="left">{row.numParticipants}</TableCell>
              <TableCell align="center">{
                !row.registered
                  ? <Button variant={'contained'} color={'secondary'} onClick={(e) => { e.stopPropagation(); console.log(row.contestId); registerContest(row.contestId); }}>Register</Button>
                  : <Button variant={'contained'} color={'secondary'} disabled>Registered</Button>
              }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

ContestList.propTypes = {
  isOpen: PropTypes.bool,
  contests: PropTypes.array,
  onClick: PropTypes.func,
  registerContest: PropTypes.func
};

export default withSnackbar(ContestList);
