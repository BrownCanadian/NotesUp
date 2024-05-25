// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmMoa-Yt86BiKzWVw8-zcMbaLr_zQMZ58",
  authDomain: "notesup-b38aa.firebaseapp.com",
  projectId: "notesup-b38aa",
  storageBucket: "notesup-b38aa.appspot.com",
  messagingSenderId: "1090881789436",
  appId: "1:1090881789436:web:6f5695cdd0819d1d0ae679",
  measurementId: "G-HYS884QYEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export {auth,googleProvider};