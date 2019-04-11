import React, { Component } from 'react';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Grid } from '@material-ui/core';



export default class Login extends Component {


    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSucces: () => false
        }
    }

    render() {
        const { Fire } = this.props
        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh', position: 'absolute', zIndex: '1' }}>
                    <Grid item xs={8} >
                        <StyledFirebaseAuth
                            uiConfig={this.uiConfig}
                            firebaseAuth={Fire.auth()}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}