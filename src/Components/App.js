import React, { Component, Fragment } from 'react';
import '../App.css';
import Fire from '../Config/Fire'
import Home from './Layouts/Home';
import Login from './Layouts/Login';
import MyAppBar from './Parts/MyAppBar'
import {Grid} from '@material-ui/core'
import ProgressSpinner from './Parts/ProgressSpinner';



class App extends Component {

  constructor(props) {
    super(props);
    this.authListener = this.authListener.bind(this);
    this.state = {
      user: null,
      loading: true,
    }
  }


  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user");
        this.setState({ user, loading: false });
      } else {
        this.setState({ user: null, loading: false });
      }
    });
  };

  render() {
    return (
      <Fragment>
        <div style={{ position: 'absolute', zIndex: 0 }}>
          <MyAppBar user={this.state.user} />
        </div>
        <div className="App" style={{ zIndex: 1 }} >
          {
            this.state.loading
            ?
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', position: 'absolute', zIndex: '1' }}>
            <Grid item xs={8} >
                <ProgressSpinner/>
            </Grid>
        </Grid>
            :
            [
            this.state.user
              ? (<Home Fire = {Fire} user={this.state.user}/>)
              : (<Login Fire={Fire} />)
            ]
          }
        </div>
      </Fragment>
    );
  }
}

export default App;
