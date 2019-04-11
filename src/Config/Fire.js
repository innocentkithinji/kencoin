import firebase from 'firebase';


var config = {
    apiKey: "AIzaSyDPCbwFJ4HBvzZi_fR2YYxl_9Mt6YP3cO4",
    authDomain: "kencoin-99d25.firebaseapp.com",
    databaseURL: "https://kencoin-99d25.firebaseio.com",
    projectId: "kencoin-99d25",
    storageBucket: "kencoin-99d25.appspot.com",
    messagingSenderId: "717742440670"
};


const Fire = firebase.initializeApp(config);

export default Fire;