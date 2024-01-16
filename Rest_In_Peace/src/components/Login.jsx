import React from "react";
import { FcGoogle } from "react-icons/fc";
import { googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { GridLoader } from "react-spinners";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";
import { uploadBytes, getStorage, ref } from "firebase/storage";
import { toast, Toaster } from "react-hot-toast";
// import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useState from "react-usestateref";
// import useStateRef from "react-usestateref";
export default function Login() {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center bg-[url('/static/images/back_img.jpg')] bg-cover bg-fixed bg-center p-2">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <HomeBtn />
          <SignUp />
        </div>
      </div>
    </>
  );
}

function SignUp() {
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [naam, setNaam] = useState("");
  const [mob, setMob] = useState("");
  const [roll, setRoll] = useState("");
  const [branch, setBranch] = useState("");
  const [poster, setPoster] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const [spin, setSpin, spinRef] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

  const signUp = async () => {
    setSpin(true);
    try {
      if (
        naam !== "" &&
        isValidMobile(mob) &&
        roll !== "" &&
        branch !== "" &&
        poster !== "" &&
        password !=="" &&
        isValidEmail(email)
      ) {
        const imgref = ref(
          storage,
          `uploads/users/${Date.now()}-${poster.name}`,
        );
        const uploadResult = await uploadBytes(imgref, poster);

        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        const uid = user.uid;
        const emailid = user.email;
        await sendEmailVerification(user);
        Swal.fire({
          title: "Verify your account!",
          text: `Email Verification Link sent to ${emailid}`,
          icon: "warning",
          confirmButtonText: "OK",
        });
        setTimeout(async () => {
          await addDoc(collection(firestore, "users"), {
            naam,
            mob,
            roll,
            branch,
            imageURL: uploadResult.ref.fullPath,
            emailid,
            uid,
          });

          Swal.fire({
            title: "GOOD JOB! NOW LOGIN",
            text: `Welcome BITIAN, ${naam}! Please check your email for verification.`,
            icon: "success",
            confirmButtonText: "Continue Logging in",
          });

          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }, 1000);
      } else {
        if (naam === "") {
          Swal.fire({
            title: "Error! Name field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (mob === "") {
          Swal.fire({
            title: "Error! Mobile field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (!isValidMobile(mob)) {
          Swal.fire({
            title: "Invalid Mobile Number",
            text: "Please enter a valid 10-digit mobile number",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (roll === "") {
          Swal.fire({
            title: "Error! Roll field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (branch === "") {
          Swal.fire({
            title: "Error! Branch field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (poster === "") {
          Swal.fire({
            title: "Error! Poster field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (email === "") {
          Swal.fire({
            title: "Error! Email field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (!isValidEmail(email)) {
          Swal.fire({
            title: "Invalid Email Address",
            text: "Please enter a valid email address",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        if (password === "") {
          Swal.fire({
            title: "Error! Pssword field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      toast.error("Account already exists or invalid emailid");
    }
    setSpin(false);
  };

  const signInWithGoogle = async () => {
    try {
      if (
        naam !== "" &&
        isValidMobile(mob) &&
        roll !== "" &&
        branch !== "" &&
        poster !== ""
      ) {
        const imgref = ref(
          storage,
          `uploads/users/${Date.now()}-${poster.name}`,
        );
        const uploadResult = await uploadBytes(imgref, poster);

        await signInWithPopup(auth, googleProvider);
        const user = auth.currentUser;
        const uid = user.uid;
        const emailid = user.email;

        await addDoc(collection(firestore, "users"), {
          naam,
          mob,
          roll,
          branch,
          imageURL: uploadResult.ref.fullPath,
          emailid,
          uid,
        });

        Swal.fire({
          title: "GOOD JOB!",
          text: `Welcome BITIAN`,
          icon: "success",
          confirmButtonText: "Continue Logging in",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        if (naam === "") {
          Swal.fire({
            title: "Error! Name field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (mob === "") {
          Swal.fire({
            title: "Error! Mobile field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (!isValidMobile(mob)) {
          Swal.fire({
            title: "Invalid Mobile Number",
            text: "Please enter a valid 10-digit mobile number",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (roll === "") {
          Swal.fire({
            title: "Error! Roll field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (branch === "") {
          Swal.fire({
            title: "Error! Branch field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (poster === "") {
          Swal.fire({
            title: "Error! Poster field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        if (email === "") {
          Swal.fire({
            title: "Error! Email field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (!isValidEmail(email)) {
          Swal.fire({
            title: "Invalid Email Address",
            text: "Please enter a valid email address",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        if (password === "") {
          Swal.fire({
            title: "Error! Pssword field is empty",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.error("Error signing in with google:", error.message);
      toast.error("Account already exists or invalid emailid");
    }
  };

  return (
    <div className="h-[50rem] w-[25rem] rounded-3xl bg-white bg-opacity-20 lg:w-[40%]">
      <Toaster />
      <div className="flex h-full flex-col items-center justify-evenly">
        <h1 className="text bg-transparent bg-clip-text p-2 text-4xl font-bold text-white">
          Create Account
        </h1>
        {spinRef.current && (
            <GridLoader
              color={`#54236D`}
              loading={spinRef.current}
              // cssOverride={override}
              className="absolute z-20 bg- m-auto w-screen"
              size={100}
            />
          )}  
        <input
          type="text"
          placeholder="Enter Full Name"
          className="text-l h-5 rounded-md bg-transparent p-2 text-center font-semibold text-white"
          autoComplete=""
          onChange={(e) => setNaam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter mobile number"
          className="text-l rounded-md border-white bg-transparent p-2 text-center font-semibold text-white"
          autoComplete="mob"
          onChange={(e) => setMob(e.target.value)}
        />
        <input
          type="text"
          placeholder=" Roll: BTECH/10XXX/22"
          className="text-l rounded-md border-white bg-transparent p-2 text-center font-semibold text-white"
          autoComplete=""
          onChange={(e) => setRoll(e.target.value)}
        />
        <input
          type="text"
          placeholder="Branch"
          className="rounded-md border-white bg-transparent p-2 text-center text-xl font-semibold text-white"
          autoComplete=""
          onChange={(e) => setBranch(e.target.value)}
        />
        <label className="drop-container" id="drop-container">
          <span className="drop-title">Drop Your Photo here</span>
          <input
            type="file"
            placeholder=""
            className="ml-10 rounded-md border-white bg-transparent pl-4 text-center text-xl font-semibold text-gray-800"
            autoComplete=""
            accept="image/*"
            onChange={(e) => setPoster(e.target.files[0])}
          />
        </label>
        <input
          type="text"
          placeholder="Email"
          className="rounded-md border-white bg-transparent p-2 text-center text-xl font-semibold text-white"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="rounded-sm bg-transparent p-2 text-center text-xl text-white"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 text-white" onClick={signUp}>
          Sign Up
        </button>
        <div className="flex gap-3">
          <FcGoogle className="google-icon" />
          <button className=" text-white shadow-2xl" onClick={signInWithGoogle}>
            Continue with<span className="bg-transparent"> Google</span>
          </button>
        </div>

        <Link to="/signin">
          <button className="p-2 text-xl text-white hover:shadow-white">
            Existing User? Login
          </button>
        </Link>
      </div>
    </div>
  );
}

function HomeBtn() {
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
    console.log("page to reload");
  }
  return (
    <Link to="/">
      <button onClick={refreshPage}>
        <h1 className="webkit mb-6 bg-clip-text text-xl font-extrabold text-transparent md:text-4xl ">
          Home
        </h1>
      </button>
    </Link>
  );
}
