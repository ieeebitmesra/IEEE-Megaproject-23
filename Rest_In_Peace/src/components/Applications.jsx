import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { getStorage} from "firebase/storage";

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);  

export default function Applications() {
  return (
    <div className="h-screen bg-[url('/static/images/dashbg.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <h1 className="text-2xl p-3 font-bold text-white m-auto text-center">Applications</h1>
      <Content />
    </div>
  );
}

const fetchApplications = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;
  const index = email.indexOf('@');
  const collname = email.slice(0, index);
  console.log(collname);
  return getDocs(collection(firestore, collname));
}

const Content = () => {
  const [appln, setappln] = useState([]);

  useEffect(() => {
    fetchApplications().then((appln) => setappln(appln.docs));
  }, []);
  return (
    <div>
      {appln.map((appln) => (
        <Card key={appln.id} {...appln.data()} />
      ))}
    </div>
  );
};

function Card(props) {
  return (
    <div className="bg-white overflow-hidden bg-[url('/static/images/dashbg.jpg')] bg-no-repeat bg-center bg-cover bg-fixed shadow-sm sm:rounded-lg p-6 mb-6">
      <div className="mx-auto">
        <table className="min-w-full text-white bg-gradient-to-r from-pink-800 to-red-500 bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Branch</th>
              <th className="py-2 px-4 border-b">Roll</th>
              <th className="py-2 px-4 border-b">Mobile</th>
              <th className="py-2 px-4 border-b">Why Join</th>
              <th className="py-2 px-4 border-b">Batch</th>
              <th className="py-2 px-4 border-b">Mail ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">{props.datetime}</td>
              <td className="py-2 px-4 border-b">{props.name.toUpperCase()}</td>
              <td className="py-2 px-4 border-b">{props.branch.toUpperCase()}</td>
              <td className="py-2 px-4 border-b">{props.roll.toUpperCase()}</td>
              <td className="py-2 px-4 border-b">{props.phone.toUpperCase()}</td>
              <td className="py-2 px-4 border-b">{props.message.toUpperCase()}</td>
              <td className="py-2 px-4 border-b">{props.batch.toUpperCase()}</td>
              <td className="py-2 px-4 border-b">{props.email.toUpperCase()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
