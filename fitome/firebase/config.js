import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID
});

export default function firebaseClient() {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
}

export const auth = app.auth()
//export default app