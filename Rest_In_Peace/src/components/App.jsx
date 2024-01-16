import React from "react";
import Home from "./Home";
import Login from "./Login";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import AdNews from "./AdNews";
import NewsR from "./NewsRoom";
import Descr from "./Descr";
import ClubD from "./ClubD";
import Profile from "./Profile";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";
import Recruit from "./Recruitment";
import Applications from "./Applications";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import useState from "react-usestateref";
import { setTime } from "@syncfusion/ej2-react-schedule";

const firebaseApp = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/add" element={<AdNews />} /> */}
        <Route path="/de" element={<Descr />} />
        <Route path="/cd" element={<ClubD />} />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <NewsR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRouteForAdmin>
              <AdNews />
            </ProtectedRouteForAdmin>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruit"
          element={
            <ProtectedRoute>
              <Recruit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const checkadmin = async () => {
  console.log("check");
  const firestore = getFirestore(firebaseApp);
  const collectionRef = collection(firestore, "admin");
  const auth = getAuth();
  // const user = auth.currentUser;
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const emailid = user.user.email;

  console.log(emailid);
  console.log("finish");
  const q = query(collectionRef, where("emailid", "==", emailid));

  try {
    console.log("inside try");
    const result = await getDocs(q);
    const temp = result.docs[0];
    console.log(temp);
    console.log("going outside");
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error checking admin:", error);
    return null;
  }
};

const ProtectedRouteForAdmin = ({ children }) => {
  console.log("inside");
  // const [userData, setuserData] = useState(null);
  const [admin, setAdmin, adminRef] = useState(false);
  console.log("before useffect", adminRef.current);

  useEffect(() => {
    checkadmin().then((result) => {
      if (result && result.docs) {
        // setuserData(result.docs);
        console.log("inside useffect");
        console.log(result.docs.length);
        setAdmin(result.docs.length !== 0);
        console.log(adminRef.current);
        console.log("leaving useffect");
        if (adminRef.curr) {
          return children;
        }
        console.log("after returning");
      }
    });
  });

  console.log("finished every", adminRef.current);
  const auth = getAuth();
  const user = auth.currentUser;
  // const admin = JSON.parse(localStorage.getItem("user"));
  if (adminRef.current) {
    console.log("Going to add");
    return children;
  }
  setTimeout(() => {
    if (!adminRef.current) {
      console.log("else exe");
      return <Navigate to="/signin" />;
    }
  }, 9000);
};
