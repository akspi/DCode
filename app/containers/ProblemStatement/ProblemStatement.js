import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import Header from '../../components/Header';
import NavigationDrawer from '../../components/NavigationDrawer';
import Problem from '../../components/Problem';
import { getProblemDetails } from '../../utils/web3ContractMethods';
import { getIpfsFileFromHash } from '../../utils/ipfsMethods';
const ReactMarkdown = require('react-markdown');


const styles = () => ({
  root: {
    display: 'flex',
  },
});

class ProblemStatement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      file: '',
    };
  }

  async componentDidMount() {
    const url = window.location['href'].split('/');
    const contestId = url[3];
    const problemIndex = url[5];
    const ipfsHash = await getProblemDetails(contestId, problemIndex);
    const file = await getIpfsFileFromHash(ipfsHash);
    this.setState({
      file: file[0],
    });
  }

  setOpen = (value) => {
    this.setState({
      open: value
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header setIsDrawerOpen={this.setOpen} isDrawerOpen={open} title={''} />
        <NavigationDrawer isDrawerOpen={open} setIsDrawerOpen={this.setOpen} />
        <div style={{'margin-top': '75px'}}>
          <ReactMarkdown isOpen={open} source={this.state.file}/>
        </div>
      </div>
    );
  }
}

ProblemStatement.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(ProblemStatement);
