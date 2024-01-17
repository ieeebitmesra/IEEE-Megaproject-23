import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { uploadBytes, getStorage, ref } from "firebase/storage";
import clubdetail from "../clubdetails";
import { toast, Toaster } from "react-hot-toast";

export default function Descr() {
  const [name, setname] = useState("");
  const [poster, setposter] = useState("");
  const [de, setDe] = useState("");
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const addPost = async () => {
    const imgref = ref(
      storage,
      `uploads/image/${name}/${Date.now()}-${poster.name}`,
    );
    const uploadResult = await uploadBytes(imgref, poster);
    await addDoc(collection(firestore, `club_base`), {
      name,
      de,
      imageURL: uploadResult.ref.fullPath,
    });
    toast.success("Submitted");
    console.log("done");
  };
  return (
    <div className="flex h-screen w-full flex-col  items-center justify-center bg-[url('/static/images/back_img.jpg')] bg-cover bg-fixed bg-center">
      <Toaster />
      <div className="h-[80%] w-[25rem] rounded-3xl bg-white bg-opacity-20">
        <div className="items-left m-5 flex h-full flex-col justify-evenly">
          <h1 className=" text-center text-4xl font-bold text-white ">
            Add Your Club
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
            type="file"
            className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center text-white"
            onChange={(e) => setposter(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Enter a descr"
            className=" rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            autoComplete="url"
            onChange={(e) => setDe(e.target.value)}
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
