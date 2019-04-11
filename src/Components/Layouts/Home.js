import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppDrawer from '../Parts/AppDrawer';
import ProgressSpiner from '../Parts/ProgressSpinner'
import RegistrationDialogue from '../Parts/RegistrationDiag'
import Dashboard from '../Parts/Dashboard/Dashboard'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class Home extends React.Component {
    
    
    state = {
        open: false,
        isRegistered: false,
        isLoading: true
    };


    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    CheckUSer(){
        const {Fire} = this.props;
        var db = Fire.firestore();
        const userid = this.props.user.uid;
        console.log("the Users")
        db.collection("users").where('uid', '==', userid).get().then((snapshot) => {
            var user = snapshot.docs.length;
            (user === 0) ? 
                this.setState({isLoading: false })
            : 
                this.setState({isRegistered: true, isLoading: false})
            
        })
    }

    componentDidMount(){
        // const {user} = this.props;
        this.CheckUSer()
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppDrawer />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                        {this.state.isLoading ? 
                            <ProgressSpiner />
                            :
                            [
                                this.state.isRegistered
                                ? 
                                <Typography>
                                   <Dashboard/>
                                </Typography>
                                : 
                                <Typography>
                                    <RegistrationDialogue open={!this.state.isRegistered} close={this.CheckUSer()}/>
                                </Typography>
                            ]
                        }
                </main>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);