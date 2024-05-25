// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkSJyGZKaiNYpSHILPCYd--9biAa6q5MU",
    authDomain: "noteup-d2302.firebaseapp.com",
    projectId: "noteup-d2302",
    storageBucket: "noteup-d2302.appspot.com",
    messagingSenderId: "473847122360",
    appId: "1:473847122360:web:dd88241fb45b9b3b11274d",
    measurementId: "G-EVNS5RYH2X"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export {auth,googleProvider};