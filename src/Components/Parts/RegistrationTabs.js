import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NoSsr, AppBar, Tab, Typography, Tabs, Grid, Paper } from '@material-ui/core';
import { UserDetails, UserUploads, CreateWallet } from './Forms';
import Fire from '../../Config/Fire'
// import { dispatch } from 'rxjs/internal/observable/range';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class NavTabs extends React.Component {
    state = {
        value: 0,
        person: {},
    };




    constructor(props) {
        super(props);
        this.goNext = this.goNext.bind(this);
        this.finishedRegistration = this.finishedRegistration.bind(this);
    }

    async setPersonPhoneNumber() {
        var User = Fire.auth().currentUser;

        console.log("User Details >>>>>>>>")
        console.log(User.displayName)
        if (User.phoneNumber != null) {
            await this.setState({
                person: {
                    name: User.displayName,
                    email: User.email,
                    phone: User.phoneNumber
                }
            })
        } else {
            await this.setState({
                person: {
                    name: User.displayName,
                    email: User.email,
                    // phone: User.phoneNumber
                }
            })
        }
    }

    componentWillMount() {
        this.setPersonPhoneNumber()
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    goNext() {
        console.log("Hello Innocent");
        this.setState((previousState) =>
            ({ value: previousState.value + 1 }))
    }

    captureUser = perzon => {
        if (perzon) {
            console.log(perzon);
            this.setState({
                person: perzon
            })
            this.goNext()
        } else {
            console.log("No User");
        }
    }

    addWallet = mnemo => {
        var person1 = this.state.person;

        person1["mnemonic"] = mnemo;

        this.setState({
            person: person1
        })

        console.log(this.state.person)
    }

    finishedRegistration = () => {
        var person = this.state.person
        var db = Fire.firestore();
        if (person.id == null) {
            person.id = ''
        }

        console.log({
            name: person.name,
            email: person.email,
            id: person.id,
            phone: person.phone,
            gender: person.gender,
            dob: person.dob,
            uid: Fire.auth().currentUser.uid,
            mnemonic: person.mnemonic
        })
        db.collection('users').add({
            name: person.name,
            email: person.email,
            id: person.id,
            phone: person.phone,
            gender: person.gender,
            dob: person.dob,
            uid: Fire.auth().currentUser.uid,
            mnemonic: person.mnemonic
        }).then(() => {
            console.log({ type: 'Added User Details ', person });
            this.props.close()
        }).catch((err) => {
            // dispatch({ type: "Add user Failed", err })
            console.log("Error Found: ", err);
            console.log(err)
        })
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <NoSsr>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                            <LinkTab label="User Details" href="page1" />
                            <LinkTab label="User Uploads" href="page2" />
                            <LinkTab label="Accounts" href="page3" />
                        </Tabs>
                    </AppBar>
                    {value === 0 &&
                        <TabContainer>
                            <Grid
                                container
                                alignItems="center"
                                justify="center">
                                <Paper style={{ width: 600, padding: 30 }}>
                                    <Typography variant="h5" >Your Personal Details</Typography>
                                    <UserDetails next={this.goNext} userDetails={this.captureUser} person={this.state.person} style={{ padding: 30 }} />
                                </Paper>
                            </Grid>

                        </TabContainer>}
                    {value === 1 &&
                        <TabContainer>
                            <div >
                                <UserUploads next={this.goNext} />
                            </div>
                        </TabContainer>}
                    {value === 2 &&
                        <TabContainer>
                            <Grid
                                container
                                alignItems="center"
                                justify="center">
                                <Paper style={{ width: 600, padding: 30 }}>
                                    <Typography variant="h5" >Your Wallet</Typography>
                                    <CreateWallet upload={this.finishedRegistration} userWallet={this.addWallet} style={{ padding: 30 }}  />
                                </Paper>
                            </Grid>
                        </TabContainer>}
                </div>
            </NoSsr>
        );
    }
}

NavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);