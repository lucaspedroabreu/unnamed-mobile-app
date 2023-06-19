// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC715WZg9-Kk8txOVcBoGCAjm2Xa5rExeo",
  authDomain: "rn-login-3849b.firebaseapp.com",
  projectId: "rn-login-3849b",
  storageBucket: "rn-login-3849b.appspot.com",
  messagingSenderId: "146489863032",
  appId: "1:146489863032:web:5125baf6bb03621a3a768d",
  measurementId: "G-D3VPFH0GCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { auth }