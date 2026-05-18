// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZb5z3k8gW5xS0mWqc2rii8fRACszfnmI",
  authDomain: "mediqueue-382cf.firebaseapp.com",
  projectId: "mediqueue-382cf",
  storageBucket: "mediqueue-382cf.firebasestorage.app",
  messagingSenderId: "205536547267",
  appId: "1:205536547267:web:177ecbb86d26fe103dad76",
  measurementId: "G-1JXKHSRGSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);