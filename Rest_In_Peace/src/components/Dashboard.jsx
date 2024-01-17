import { React, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Dashmain from "./Dashmain";
import Footer from "./Footer";
import Navfunc from "./Dashnav";
import { FaCaretDown } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const getuserbyuid = async () => {
  const firestore = getFirestore(firebaseApp);
  const collectionRef = collection(firestore, "users");
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  console.log(uid);
  const q = query(collectionRef, where("uid", "==", uid));
  const result = await getDocs(q);
  return result;
}

const getImageUrl = async (path) => {
  return await getDownloadURL(ref(storage, path));
};

const AlluserData = () => {
    const navigate = useNavigate();
    const [userData, setuserData] = useState(null);
    useEffect(() => {
    getuserbyuid().then((userData) => setuserData(userData.docs));
    }, []);
    if(userData){
      const extractedUserArray = userData.map(user => user.data());
      if(userData && extractedUserArray.length==0){
        Swal.fire({
          title: 'Incomplete Profile',
          text: 'Redirecting....',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    }
  return (
    <div>
      {userData &&
        userData.map((user) => (
          <Nav key={user.id} {...user.data()} />
        ))}
    </div>
  );
};

function Nav(props) {
  const [url, setUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getImageUrl(props.imageURL).then((url) => setUrl(url));
  }, [props.imageURL]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="p-2 grid grid-cols-2 bg-gradient-to-r from-pink-800 to-red-500 align-middle">
      <h1 className="text-white mb-auto m-auto bg-clip-text text-2xl font-extrabold text-transparent md:text-4xl">
        CLUBCONNECT
      </h1>
      <ul className="flex justify-between items-center p-1">
        <li className="ml-auto relative">
          <p
            className="p-2 text-white flex cursor-pointer"
            src={url}
            alt="profile-pic"
            onClick={toggleDropdown}
          >Your Profile<FaCaretDown className="m-1"/></p>
        </li>
      </ul>
      {isDropdownOpen && (
            <div className="absolute top-12 border-white border-2 right-5 z-20 bg-gradient-to-r from-pink-800 to-red-500 text-white p-2 rounded shadow">
                <img src={url} className="p-1 w-20 rounded-full m-auto"></img>
                <div className="">
                <p className="p-1 text-white">Welcome, {props.naam}</p>
                <p className="p-1 text-white">ROLL - {props.roll}</p>
                <p className="p-1 text-white">BRANCH - {props.branch}</p>
                <p className="p-1 text-white">MOBILE - {props.mob}</p>
                <p className="p-1 text-white">EMAIL - {props.emailid}</p>
                </div>
            </div>
        )}
    </div>
  );
}

function Navigator() {
  const [isOpen, setIsOpen] = useState("false");
  return <Navfunc props={isOpen} />;
}

function Dashboard() {
  return (
    <div className="bg-[url('/static/images/dashbg.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <AlluserData />
      <div className="text-center">
        <Navigator />
        <Dashmain />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
