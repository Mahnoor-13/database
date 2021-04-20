import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBL4-jRyAwiSpipxwCRVswxX0JXIajUVHY",
  authDomain: "fruits-database-735ac.firebaseapp.com",
  projectId: "fruits-database-735ac",
  storageBucket: "fruits-database-735ac.appspot.com",
  messagingSenderId: "398931916648",
  appId: "1:398931916648:web:50170829cce959dbad48dd",
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
export default db;
