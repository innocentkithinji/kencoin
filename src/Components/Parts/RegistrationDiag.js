import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Button, Dialog, Slide} from '@material-ui/core';
import RegistrationTabs from './RegistrationTabs';


const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class RegistrationDialogue extends React.Component {
    state = {
        open: false,
        person: {}
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {   
        console.log("Closing")
        this.setState({ open: false });
        console.log(this.state)
        this.props.close()
    };


    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Open full-screen dialog
                </Button>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}>
                    <RegistrationTabs close={this.handleClose} open={this.handleClickOpen}/>
                </Dialog>
            </div>
        );
    }
}

RegistrationDialogue.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegistrationDialogue);