import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography, Fab } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ethers } from 'ethers';
import SimpleCrypto from "simple-crypto-js";
import Fire from '../../../Config/Fire'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
});

class CreateWallet extends React.Component {
    state = {
        mnemonic: "",
        Encrypted: "",
        new: false
    }

    constructor(props) {
        super(props);
        this.createNewWallet = this.createNewWallet.bind(this);
    }

    async createNewWallet() {
        const mnemonic = await ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
        var uid = Fire.auth().currentUser.uid;
        var simpleCrypto = new SimpleCrypto(uid)
        var encrypted = simpleCrypto.encrypt("" + mnemonic)
        this.setState({
            Encrypted: encrypted,
            mnemonic: mnemonic,
            new: true,
        })
        this.props.userWallet(encrypted);

    }

    getMnemonic = name => e => {
        this.setState({
            [name]: e.target.value
        })
        console.log(this.state.mnemonic)
    }

    importWallet = () => {
        const mnemonic = this.state.mnemonic;
        var uid = Fire.auth().currentUser.uid;
        var simpleCrypto = new SimpleCrypto(uid)
        var encrypted = simpleCrypto.encrypt("" + mnemonic)
        this.setState({
            Encrypted: encrypted,
            mnemonic: mnemonic,
            new: true,
        })
        this.props.userWallet(encrypted);

    }

    handleClose = () => {
        this.setState({ new: false });
    };

    finishSignup = () => {
        this.props.upload()
    }

    render() {

        return (
            <div style={{ marginTop: 100 }}>
                <div style={{ display: "flex", justifyContent: "center", margin: 30 }}>
                    <Button color='primary' variant="contained" onClick={this.createNewWallet}> CreateWallet</Button>

                </div>
                <Typography style={{ display: "flex", justifyContent: "center" }}>Or</Typography>
                <Typography style={{ display: "flex", justifyContent: "center" }}>Import Wallet Using your Mnemonic Phrase</Typography>
                <TextField
                    id="outlined-name"
                    label="Mnemonic Phrase"
                    multiline
                    fullWidth
                    onChange={this.getMnemonic('mnemonic')}
                    rows='3'
                    margin="normal"
                    variant="outlined"
                />
                <div style={{ display: "flex", justifyContent: "center", margin: 30 }}>
                    <Button color='primary' variant="contained" onClick={this.importWallet}> Import</Button>

                </div>
                <Dialog
                    open={this.state.new}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Store the Following Mnemonic Safely"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.mnemonic}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                <div style={{ position: "absolute", bottom: 0, right: 0, padding: 30 }}>
                    <Button onClick={this.finishSignup}  >
                        <Fab variant="extended" aria-label="Delete">
                            <ChevronRightIcon />
                            Complete
                            </Fab>
                    </Button>
                </div>
            </div>

        );
    }
}

CreateWallet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateWallet);