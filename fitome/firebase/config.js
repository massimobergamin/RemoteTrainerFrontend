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
    apiKey: "AIzaSyCwfKaRPMf-p9FTe5U3wzmiCX2W6ZUNPAQ",
    authDomain: "fitome-3d344.firebaseapp.com",
    projectId: "fitome-3d344",
    storageBucket: "fitome-3d344.appspot.com",
    messagingSenderId: "519673153511",
    appId: "1:519673153511:web:beeb340962368f6384df42"
};

let app; 


if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
  
} else {
  app = firebase.app();
}
  
export const auth = app.auth();
export default app;
