import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { uploadBytes, getStorage, ref } from "firebase/storage";
import clubdetail from "../clubdetails";
import { toast, Toaster } from "react-hot-toast";

export default function AdminNews() {
  const [name, setname] = useState("");
  const [date, setdate] = useState("");
  const [eventdate, seteventdate] = useState("");
  const [poster, setposter] = useState("");
  const [Url, setUrl] = useState("");
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  //   const firebase =
  function addpost() {
    console.log(name, date, eventdate, poster, Url);
  }
  // const handlePost

  const addPost = async () => {
    const imgref = ref(
      storage,
      `uploads/newsroom/${Date.now()}-${poster.name}`,
    );
    const uploadResult = await uploadBytes(imgref, poster);
    await addDoc(collection(firestore, "news"), {
      name,
      date,
      eventdate,
      Url,
      imageURL: uploadResult.ref.fullPath,
    });
    toast.success("Posted!");
    console.log("done");
  };
  return (
    <div className="flex h-screen w-full flex-col  items-center justify-center bg-[url('/static/images/back_img.jpg')] bg-cover bg-fixed bg-center">
      <Toaster />
      <div className="h-[80%] w-[25rem] rounded-3xl bg-white bg-opacity-20">
        <div className="items-left m-5 flex h-full flex-col justify-evenly">
          <h1 className=" text-center text-4xl font-bold text-white ">
            ADD NOTICE
          </h1>
          <select
            className=" rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            onChange={(e) => setname(e.target.value)}
          >
            <option value="">Select a Club from dropdown</option>
            {clubdetail.map((ele) => (
              <option value={ele.name}>{ele.name}</option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Date"
            className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            autoComplete="Current-date"
            onChange={(e) => setdate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Event-Date"
            className=" rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            autoComplete="Date"
            onChange={(e) => seteventdate(e.target.value)}
          />
          <input
            type="file"
            className="text-white rounded-xl p-2 text-center bg-[url('/static/images/newsroom.jpeg')] bg-no-repeat bg-center bg-cover bg-fixed"
            accept="image/*"
            onChange={(e) => setposter(e.target.files[0])}
          />
          <input
            type="url"
            placeholder="Enter a link"
            className=" rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            autoComplete="url"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="mx-auto w-full rounded-xl border-2 bg-gradient-to-r from-red-700 to-pink-800 py-2 text-center
                text-white hover:opacity-80 md:text-2xl"
            onClick={addPost}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
