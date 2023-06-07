import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const config = {
    apiKey: "AIzaSyCDHi9irjPaxYmONa11LQ2qKMF4I6GWL3A",
    authDomain: "hangout-social-auth.firebaseapp.com",
    projectId: "hangout-social-auth",
    storageBucket: "hangout-social-auth.appspot.com",
    messagingSenderId: "208291371336",
    appId: "1:208291371336:web:459b806234e4465899fb7d",
    measurementId: "G-H2BC0535JJ"
  };

if(!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase