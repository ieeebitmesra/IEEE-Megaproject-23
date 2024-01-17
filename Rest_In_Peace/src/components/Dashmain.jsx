import React from "react";
import clubdetail from "../clubdetails";
import { useNavigate } from "react-router-dom";
import useState from "react-usestateref";

function Dashmain() {
  return (
    <div className="bg-[url('/static/images/dashbg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat md:grid md:grid-cols-3 lg:grid-cols-4">
      {clubdetail.map((ele) => (
        <ClubList ele={ele} key={ele.id} />
      ))}
    </div>
  );
}
function ClubList({ ele }) {
  const navigate = useNavigate();
  const [curr, setCurr, currRef] = useState("");
  const Sec = async (e) => {
    setCurr(e);
    // localStorage.clear();
    // localStorage.removeItem("club");
    localStorage.setItem("club", JSON.stringify(currRef.current));
    console.log("added to local");
    const it = JSON.parse(localStorage.getItem("club"));
    if (it) {
      navigate("/cd");
    }

    console.log(it);
    console.log("done");
  };

  return (
    <div className="l-container m-auto my-4 items-center rounded-xl p-0 text-center">
      <div className="l-card items-center rounded-xl">
        <div className="l-front rounded-xl">
          <img
            loading="lazy"
            className="m-auto rounded-xl"
            src={ele.img_url}
            alt="clb-img"
          />
        </div>
        <div className="l-rear flex flex-col flex-wrap items-center rounded-xl bg-gradient-to-r from-red-700 to-pink-800 ">
          <h3 className="mb-0 pb-0 text-xl font-bold text-white">{ele.name}</h3>
          <div className="h1 mt-0 w-36 rounded-2xl border-b-4 border-purple-950 pt-0 md:mt-4"></div>
          <p className="text-white">{ele.desc}</p>
          <button
            onClick={() => Sec(ele.name)}
            className="h-15   my-5 rounded-2xl bg-purple-500  px-2 text-center text-3xl font-bold text-white shadow hover:shadow-lg hover:shadow-purple-500"
          >
            Visit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashmain;
