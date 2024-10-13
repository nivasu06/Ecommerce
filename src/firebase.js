// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNlWRUuE3PhsA56OX4O8SJloFIKE_MG74",
  authDomain: "shopping-553da.firebaseapp.com",
  projectId: "shopping-553da",
  storageBucket: "shopping-553da.appspot.com",
  messagingSenderId: "98587598917",
  appId: "1:98587598917:web:ff18a466ed562a04c3832c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);
//const analytics = getAnalytics(app);