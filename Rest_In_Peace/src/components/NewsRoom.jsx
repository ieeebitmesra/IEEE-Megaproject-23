import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Navfunc from "./Dashnav";

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

function Navigator() {
  const [isOpen, setIsOpen] = useState("false");
  return <Navfunc props={isOpen} />;
}

export default function NewsR() {
  return (
    <div className="bg-[url('/static/images/dashbg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat text-center">
      <p className="bg-gradient-to-r from-red-600 to-pink-800 p-6 text-left font-serif text-4xl text-white md:text-6xl">
        NEWSROOM
      </p>
      <Navigator className="m-auto" />
      <Ns />
    </div>
  );
}
const Ns = () => {
  const [newss, setnewss] = useState([]);
  useEffect(() => {
    Nws().then((newss) => setnewss(newss.docs));
  }, []);
  return (
    <div className="grid bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat md:grid-cols-2">
      {newss.map((newss) => (
        <Cards key={newss.id} {...newss.data()} />
      ))}
    </div>
  );
};

const Nws = () => {
  const firestore = getFirestore(firebaseApp);
  return getDocs(collection(firestore, "news"));
};

const getImageUrl = async (path) => {
  return await getDownloadURL(ref(storage, path));
};

function Cards(props) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    getImageUrl(props.imageURL).then((url) => setUrl(url));
  }, [props.imageURL]);
  return (
    <div class="news-container m-10 rounded-xl bg-gradient-to-r from-pink-800 to-red-500 text-white shadow-lg shadow-white">
      <div className="l-card items-center rounded-xl">
        <div className="l-front">
          <img
            class="h-full w-full border-2 border-black shadow-lg shadow-white"
            src={url}
            alt="poster"
            loading="lazy"
          ></img>
        </div>
        <div className="l-rear">
          <div class="m-5 p-5">
            <div class="mb-2 mr-2 text-center text-xl font-bold uppercase md:text-2xl">
              {props.name}
            </div>
          </div>
          <div class="grid text-center text-sm md:text-xl">
            <span class="mb-2 mr-2 inline-block rounded-full font-semibold uppercase text-white">
              Posted on: {props.date}
            </span>
            <span class="mb-2 mr-2 inline-block rounded-full font-semibold uppercase text-white">
              event Date: {props.eventdate}
            </span>
            <a
              href={props.Url}
              class="inline-block rounded-full font-semibold uppercase text-white underline"
            >
              link: {props.Url}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
