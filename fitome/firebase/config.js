import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
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

