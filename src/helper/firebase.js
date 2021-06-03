import firebase from 'firebase'
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCAJf0AEC_3Ykl8mIXJ5eAaEZkG1dE513s",
  authDomain: "near-me-7eea0.firebaseapp.com",
  databaseURL: "https://near-me-7eea0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "near-me-7eea0",
  storageBucket: "near-me-7eea0.appspot.com",
  messagingSenderId: "65885695375",
  appId: "1:65885695375:web:034f9557a5d617ec85affa",
  measurementId: "G-T5L1WTWTQC"
};
  // Initialize Firebase
var fire =firebase.initializeApp(firebaseConfig);
export default fire;
