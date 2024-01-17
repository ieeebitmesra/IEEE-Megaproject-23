import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { getAuth } from "firebase/auth";
function Navbar() {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 500)
    console.log("page to reload");
  }
  const auth = getAuth();
  const user = auth.currentUser;
  let str = ""
  if(user) str = "/dashboard"
  else str = "/signin" 
  return (
    <div className="absolute grid w-full grid-cols-3 items-center justify-between p-4">
      <div className="z-20">
        <h1 className="webkit bg-clip-text text-sm font-extrabold text-transparent md:text-4xl">
          CLUBCONNECT
        </h1>
      </div>
      <div className="z-20">
        <img
          className="invisible m-auto h-auto w-1/4 rounded-full shadow-2xl shadow-white md:visible"
          src="/static/images/bit.png"
          alt="bit-logo"
        />
      </div>
      <div className="z-20">
        <BsMenuButtonWideFill
          onClick={handleNav}
          className="float-right cursor-pointer text-white hover:opacity-70"
          size={37}
        />
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 z-10 h-screen w-full flex-col bg-black/90 px-4 py-7 text-gray-300 duration-500 ease-in"
            : "absolute left-[-100%] top-0 z-10 h-screen bg-red-800 duration-500 ease-in"
        }
      >
        <ul className="fixed mt-[3rem] flex h-full w-full flex-col items-center justify-center">
          <li className="hover: bg-gradient-to-r from-pink-800 to-red-500 bg-clip-text p-5 text-3xl font-bold text-transparent">
            <Link to="/">
              <button
                onClick={refreshPage}
                className="px-4 py-2 shadow-lg hover:text-white hover:shadow-red-500 focus:outline-none focus:ring focus:ring-violet-300"
              >
                Home
              </button>
            </Link>
          </li>
          <li className="bg-gradient-to-r from-pink-800 to-red-500 bg-clip-text  p-6 text-4xl font-bold text-transparent hover:shadow-red-500">
            <button
              href=""
              className="px-4 py-2 shadow-lg hover:text-white hover:shadow-red-500 focus:outline-none focus:ring focus:ring-violet-300"
            >
              Contact Us
            </button>
          </li>
          <li className="bg-gradient-to-r from-pink-800 to-red-500 bg-clip-text  p-5 text-5xl font-bold text-transparent hover:shadow-red-500">
            <Link to={str}>
              <button
                onClick={refreshPage}
                className="px-4 py-2 shadow-lg hover:text-white hover:shadow-red-500 focus:outline-none focus:ring focus:ring-violet-300"
              >
                Login
              </button>
            </Link>
          </li>
          <li className="bg-gradient-to-r from-pink-800 to-red-500 bg-clip-text  p-5 text-5xl font-bold text-transparent hover:shadow-red-500">
            <Link to="/dashboard">
              <button
                onClick={refreshPage}
                className="px-4 py-2 shadow-lg hover:text-white hover:shadow-red-500 focus:outline-none focus:ring focus:ring-violet-300"
              >
                Dashboard
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
