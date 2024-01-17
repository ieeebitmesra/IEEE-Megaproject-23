import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import Navfunc from "./Dashnav";
import Swal from "sweetalert2";

function Navigator() {
  const [isOpen, setIsOpen] = useState(false);
  return <Navfunc props={isOpen} />;
}

export default function Recruit() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [club, setclub] = useState("");
  const [name, setname] = useState("");
  const datetime = getCurrentDateTime();
  const [phone, setphone] = useState("");
  const [branch, setbranch] = useState("");
  const [message, setmessage] = useState("");
  const [roll, setroll] = useState("");
  const [batch, setbatch] = useState("");
  const email = user?.user?.email;
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);

  function getCurrentDateTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const isValidRoll = (roll) => /^BTECH\/10\d{3}\/\d{2}$/.test(roll);
  const isValidBatch = (batch) => /^[A-Za-z0-9]+$/.test(batch);

  const addPost = async () => {
    if (!isValidPhone(phone)) {
      Swal.fire({
        title: "Invalid Phone Number",
        text: "Please enter a valid 10-digit phone number.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!isValidBatch(batch)) {
      Swal.fire({
        title: "Invalid Batch",
        text: "Please enter a valid batch (alphanumeric characters only).",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    await addDoc(collection(firestore, club), {
      email,
      name,
      datetime,
      phone,
      branch,
      message,
      roll,
      batch,
    });

    console.log(
      email,
      club,
      name,
      datetime,
      phone,
      branch,
      message,
      roll,
      batch
    );

    Swal.fire({
      title: "Application Received",
      text: "Try your best in the Tests",
      icon: "success",
      confirmButtonText: "OK",
    });

    console.log("data added");
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[url('/static/images/back_img.jpg')] bg-cover bg-fixed bg-center">
      <div className="h-[35rem] w-[25rem] rounded-3xl bg-white bg-opacity-20">
        <div className="flex h-full flex-col items-left justify-evenly m-5">
          <h1 className="text-white text-4xl font-bold text-center">JOIN CLUBS</h1>

          <label htmlFor="club" className="text-white text-lg">Select a Club:</label>
          <select
            id="club"
            className="rounded-xl p-1 text-center bg-[url('/static/images/newsroom.jpeg')] bg-no-repeat bg-center bg-cover bg-fixed"
            onChange={(e) => setclub(e.target.value)}
          >
            <option value="">Select a Club</option>
            <option value="ietbit">IET</option>
            <option value="ieeebit">IEEE</option>
            <option value="acmbit">ACM</option>
            <option value="ietebit">IETE</option>
          </select>

          <label htmlFor="name" className="text-white text-lg">Enter Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            className="rounded-xl p-1 text-center bg-[url('/static/images/newsroom.jpeg')] bg-no-repeat bg-center bg-cover bg-fixed"
            onChange={(e) => setname(e.target.value)}
          />

          <label htmlFor="phone" className="text-white text-lg">Contact No:</label>
          <input
            type="text"
            id="phone"
            placeholder="Contact No"
            className="rounded-xl p-1 text-center bg-[url('/static/images/newsroom.jpeg')] bg-no-repeat bg-center bg-cover bg-fixed"
            onChange={(e) => setphone(e.target.value)}
          />

          <label htmlFor="roll" className="text-white text-lg">BTECH/10XXX/XX:</label>
          <input
            type="text"
            id="roll"
            placeholder="BTECH/10XXX/XX"
            className="rounded-xl p-1 text-center bg-[url('/static/images/newsroom.jpeg')] bg-no-repeat bg-center bg-cover bg-fixed"
            onChange={(e) => setroll(e.target.value)}
          />

          <label htmlFor="branch" className="text-white text-lg">Branch:</label>
          <input
            type="text"
            id="branch"
            placeholder="Branch"
            className="rounded-xl p-1 text-center bg-[url('/static/images/newsroom.jpeg')] bg-no-repeat bg-center bg-cover bg-fixed"
            onChange={(e) => setbranch(e.target.value)}
          />

          <label htmlFor="message" className="text-white text-lg">Why do you want to join?</label>
          <input
            type="text"
            id="message"
            placeholder="Why do you want to join?"
            className="rounded-xl p-1 text-center bg-[url('/static/images/newsroom.jpeg')] bg-no-repeat bg-center bg-cover bg-fixed"
            onChange={(e) => setmessage(e.target.value)}
          />

          <label htmlFor="batch" className="text-white text-lg">Batch:</label>
          <input
            type="text"
            id="batch"
            placeholder="Batch"
            className="rounded-xl p-1 text-center bg-[url('/static/images/newsroom.jpeg')] bg-no-repeat bg-center bg-cover bg-fixed"
            onChange={(e) => setbatch(e.target.value)}
          />

          <button
            className="mx-auto my-2 text-white w-full rounded-xl border-2 bg-gradient-to-r from-red-700 to-pink-800 py-2
                text-center hover:opacity-80 md:text-2xl"
            onClick={addPost}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
