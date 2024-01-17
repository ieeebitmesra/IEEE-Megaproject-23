import { Link } from "react-router-dom";
import { FaHome, FaCalendar, FaPowerOff, FaNewspaper } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { React, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query
} from "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);

const logout = () => {
  localStorage.clear('user');
  window.location.href = '/login';
}

const checkadmin = async () => {
  const firestore = getFirestore(firebaseApp);
  const collectionRef = collection(firestore, "admin");
  const auth = getAuth();
  const user = auth.currentUser;
  const emailid = user.email;
  console.log(emailid);
  const q = query(collectionRef, where("emailid", "==", emailid));
  
  try {
    const result = await getDocs(q);
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error checking admin:", error);
    return null;
  }
}

function Sidebar() {
  const [userData, setuserData] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    checkadmin().then((result) => {
      if (result && result.docs) {
        setuserData(result.docs);
        setAdmin(result.docs.length !== 0);
      }
    });
  }, []);

  return (
    <div className="m-3">
      <ul className="md:flex absolute z-10 bg-[url('/static/images/dashbg.jpg')] bg-no-repeat bg-center bg-cover bg-fixed md:relative justify-center ">
        <li className="flex text-white rounded-xl m-3 hover:shadow-lg hover:shadow-white hover:bg-gradient-to-r from-pink-600 to-red-500 hover:text-white">
          <FaHome className="my-auto ml-8" size={25} />
          <Link to="/">
            <button className="p-5 font-sans text-lg font-bold" >Home</button>
          </Link>
        </li>
        <li className="flex text-white rounded-xl m-3 hover:shadow-lg hover:shadow-white hover:bg-gradient-to-r from-pink-600 to-red-500 hover:text-white">
          <FaCalendar className="my-auto ml-8" size={25} />
          <Link to="/dashboard">
            <button className="p-5 font-sans text-lg font-bold" >Dashboard</button>
          </Link>
        </li>
        {!admin && (
          <li className="flex text-white rounded-xl m-3 hover:shadow-lg hover:shadow-white hover:bg-gradient-to-r from-pink-600 to-red-500 hover:text-white">
            <FaHome className="my-auto ml-8" size={25} />
            <Link to="/recruit">
              <button className="p-5 font-sans text-lg font-bold" >Join Clubs</button>
            </Link>
          </li>
        )}
        {!admin && (
          <li className="flex text-white rounded-xl m-3 hover:shadow-lg hover:shadow-white hover:bg-gradient-to-r from-pink-600 to-red-500 hover:text-white">
            <FaNewspaper className="my-auto ml-8" size={25} />
            <Link to="/news">
              <button className="p-5 font-sans text-lg font-bold" >Newsroom</button>
            </Link>
          </li>
        )}
        {admin && (
          <li className="flex text-white rounded-xl m-3 hover:shadow-lg hover:shadow-white hover:bg-gradient-to-r from-pink-600 to-red-500 hover:text-white">
            <MdAdminPanelSettings className="my-auto ml-8" size={25} />
            <Link to="/add">
              <button className="p-5 font-sans text-lg font-bold" >Add News</button>
            </Link>
          </li>
        )}
        {admin && (
          <li className="flex text-white rounded-xl m-3 hover:shadow-lg hover:shadow-white hover:bg-gradient-to-r from-pink-600 to-red-500 hover:text-white">
            <MdAdminPanelSettings className="my-auto ml-8" size={25} />
            <Link to="/applications">
              <button className="p-5 font-sans text-lg font-bold">Applications</button>
            </Link>
          </li>
        )}
        <li className="flex text-white rounded-xl m-3 hover:shadow-lg hover:shadow-white hover:bg-gradient-to-r from-pink-600 to-red-500 hover:text-white">
          <FaPowerOff className="my-auto ml-8" size={25} />
          <button onClick={logout} className="p-5 font-sans text-lg font-bold" >Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
