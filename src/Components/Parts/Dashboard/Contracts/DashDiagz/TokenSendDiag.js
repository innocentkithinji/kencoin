import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TokenSendDiag extends React.Component {


    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
        this.state = {
            open: false,
            userAddr: "K",
            sendAmount: "Ox",
        };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value,})
    };

    send(){
        this.props.send(this.state.userAddr, this.state.sendAmount)
        this.handleClose()
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}
                        style={{display: "flex", margin: 20}}>
                    Send Tokens
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter Address of the recipient who is going to recieve the tokens:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userAddr"
                            label="Reciepent Address"
                            type="text"
                            name="userAddr"
                            value={this.state.userAddr}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="tokenAmt"
                            label="Amount"
                            name="sendAmount"
                            value={this.state.sendAmount}
                            onChange={this.handleChange}
                            type="number"
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={this.send} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
