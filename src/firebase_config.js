import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCg1m5s-ConnuFrBa5SLjBbpOjZ5qeeARc",
  authDomain: "events-83b77.firebaseapp.com",
  projectId: "events-83b77",
  storageBucket: "events-83b77.appspot.com",
  messagingSenderId: "152452467914",
  appId: "1:152452467914:web:be4bddb5cd41097db47833",
  measurementId: "G-9JZL81P575"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

export {
    auth, 
    database, 
    storage
}