import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#64b5f6",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#e3f2fd",
    },
  },
});


class AccountDetails extends Component {


  render() {
    console.clear()
    console.log(this.props.info)
    const { classes, info } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell align="center"> Account Address</CustomTableCell>
                <CustomTableCell align="center">Private Address</CustomTableCell>
                <CustomTableCell align="center">ETH Balance (ETH)</CustomTableCell>
                <CustomTableCell align="center">KenCoin Balance (KSh)</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.row} >
                <CustomTableCell component="th" scope="row" align="center">
                  {info.address}
                </CustomTableCell>
                <CustomTableCell align="center">
                  {info.prrivKey}
                </CustomTableCell>
                <CustomTableCell align="center">{info.weiBalance}</CustomTableCell>
                <CustomTableCell align="center">{info.KenCoinBalance}</CustomTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }

}

AccountDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountDetails);