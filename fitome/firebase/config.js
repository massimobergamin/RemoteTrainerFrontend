import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    // apiKey: process.env.FIREBASE_APIKEY,
    // authDomain: process.env.FIREBASE_AUTHDOMAIN,
    // projectId: process.env.FIREBASE_PROJECTID,
    // storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    // messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    // appId: process.env.FIREBASE_APPID
    apiKey: "AIzaSyB3RJAG9yFpilvVYinogOmwB0vk12Eez4c",
    authDomain: "fitomenew.firebaseapp.com",
    projectId: "fitomenew",
    storageBucket: "fitomenew.appspot.com",
    messagingSenderId: "869965426965",
    appId: "1:869965426965:web:00ba65395387efdf6b791c"
};

let app;


if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
  
} else {
  app = firebase.app();
}

const projectStorage = firebase.storage();
const auth = app.auth();
export {projectStorage, auth}

export default app;

