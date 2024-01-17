import React from "react";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { GridLoader } from "react-spinners";

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default function Sample() {
  let na = localStorage.getItem("club");
  console.log(na);
  return (
    <div className="flex h-full m-auto p-5 flex-col items-center justify-evenly bg-[url('/static/images/dashbg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat px-[10%] text-center text-white">
      <ClubData />
    </div>
  );
}

const cl = async () => {
  const firestore = getFirestore(firebaseApp);
  const collectionRef = collection(firestore, "club_base");
  let na = JSON.parse(localStorage.getItem("club"));
  const temp = "Dance_Club";
  console.log("inside");
  console.log(na);
  const q = query(collectionRef, where("name", "==", na));
  const res = await getDocs(q);
  return res;
};
const getImageUrl = async (path) => {
  return await getDownloadURL(ref(storage, path));
};
const ClubData = () => {
  const [clubDa, setClubData] = useState(null);
  useEffect(() => {
    cl().then((e) => setClubData(e.docs));
  }, []);
  // console.log(clubDa.name);

  return (
    <div>{clubDa && clubDa.map((e) => <Bot key={e.name} {...e.data()} />)}</div>
  );
};
function Bot(props) {
  const [imurl, setimurl] = useState("");

  useEffect(() => {
    getImageUrl(props.imageURL).then((url) => setimurl(url));
  }, [props.imageURL]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <div>
      {loading ? (
        <GridLoader
          color={`#54236D`}
          loading={loading}
          // cssOverride={override}
          className="h-screen"
          size={100}
        />
      ) : (
        <div>
          <h1 className="m-3 p-3 text-2xl font-extrabold">{props.name}</h1>
          <div className="rounded-xl p-0">
            <img
              src={imurl}
              alt="club"
              className="m-auto mb-3 h-[30%] w-[30%] rounded-xl pb-3"
            />
          </div>

          <p className="text-xl font-semibold">{props.de}</p>
        </div>
      )}
    </div>
  );
}
