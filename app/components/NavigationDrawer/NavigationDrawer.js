import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewList from '@material-ui/icons/ViewList';
import ListItem from '@material-ui/core/ListItem';
import { useTheme } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { FilterNone, ListAlt, Lock } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

function NavigationDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { isDrawerOpen, setIsDrawerOpen, history } = props;

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setIsDrawerOpen(false)}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key={'Problems'} onClick={() => { history.push('/problems'); }}>
          <ListItemIcon><ViewList /></ListItemIcon>
          <ListItemText primary={'Problems'} />
        </ListItem>
        <ListItem button key={'My Submissions'} onClick={() => { history.push('/submissions'); }}>
          <ListItemIcon><FilterNone /></ListItemIcon>
          <ListItemText primary={'My Submissions'} />
        </ListItem>
        <ListItem button key={'Submit Code'} onClick={() => { history.push('/submit'); }}>
          <ListItemIcon><Lock /></ListItemIcon>
          <ListItemText primary={'Submit Code'} />
        </ListItem>
        <ListItem button key={'Leaderboard'}>
          <ListItemIcon><ListAlt /></ListItemIcon>
          <ListItemText primary={'Leaderboard'} />
        </ListItem>
      </List>
    </Drawer>
  );
}

NavigationDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  setIsDrawerOpen: PropTypes.func,
  history: PropTypes.any
};

export default withRouter(NavigationDrawer);
