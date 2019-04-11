import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class DepositTokensDiag extends React.Component {


    state = {
        open: false,
        depoAmount: ""
    }

    constructor(props){
        super(props);

        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.deposit = this.deposit.bind(this)
    }



    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange(event){

        this.setState({depoAmount: event.target.value})
    }

    deposit = () => {
        const amount = this.state.depoAmount;
        console.log(amount)
        this.props.deposit(amount)
        this.handleClose()
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{display: "flex", margin: 20}}>
                    Deposit Tokens
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter Amount to Deposit:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userAddr"
                            label="Amount to deposit"
                            name="depositAmt"
                            value={this.state.depoAmount}
                            onChange={this.handleChange}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.deposit} color="primary">
                            Deposit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
