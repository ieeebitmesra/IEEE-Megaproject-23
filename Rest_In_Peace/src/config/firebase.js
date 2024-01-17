import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAlEHzwbJEsWfzw2S56BaMHJOHVBtN8W5c",
  authDomain: "clubconnect-6d118.firebaseapp.com",
  projectId: "clubconnect-6d118",
  storageBucket: "clubconnect-6d118.appspot.com",
  messagingSenderId: "691930125830",
  appId: "1:691930125830:web:32b8ddad7d873a6d24d587",
  measurementId: "G-XXK69JQWH1",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const perf = getPerformance(app);
export { auth, googleProvider, firebaseConfig };
