import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
function Showcase() {
  function refreshPage() {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      window.location.reload(false);
    }, 500)
    console.log("page to reload");
  }
  const auth = getAuth();
  const user = auth.currentUser;
  let str = ""
  if(user) str = "/dashboard"
  else str = "/login" 
  return (
    <div className="grid-cols-2 md:grid">
      <div className="md:p-auto justify-center bg-gradient-to-r from-pink-800 to-red-500 align-middle text-white md:p-5">
        <div>
          <p className="p-8 text-left font-serif text-4xl md:text-6xl">
            Empowering Clubs in the Digital Realm
          </p>
          <p className="p-8 text-left text-2xl md:text-3xl">
            Your Virtual Hub for Seamless Collaboration and Activities.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <Link to={str}>
            <button
              className="h14 m-5 mt-10 w-full rounded-2xl border-4 bg-gradient-to-r from-red-700 to-pink-800 p-5 
                text-center hover:opacity-80 md:text-4xl"
                onClick={refreshPage}
            >
              Create Account
            </button>
          </Link>
        </div>
      </div>
      <div className="justify-center shadow-2xl">
        <img
          loading="lazy"
          className="m-auto block h-auto w-full shadow-2xl md:w-full"
          src="/static/images/college-stud.png"
          alt=""
        />
      </div>
    </div>
  );
}
export default Showcase;
