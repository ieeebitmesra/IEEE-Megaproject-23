import React from "react";
import dev_details from "../developer_details";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
function Meetdev() {
  return (
    <div id="developersSection" className="my-20 bg-[url('/static/images/img-bg.jpg')]">
      <p className="leading-13 mb-6 bg-gradient-to-r from-red-600 to-pink-800 p-6 text-left font-serif text-4xl text-white md:text-6xl">
        Meet The Developers
      </p>
      <div className="grid-cols-3 p-10 text-white md:grid">
        {dev_details.map((ele) => (
          <Card
            img_url={ele.img_url}
            name={ele.name}
            insta_id={ele.insta_id}
            linkedin_id={ele.linkedin_id}
            contact={ele.contact}
            portfolio={ele.portfolio}
          />
        ))}
      </div>
    </div>
  );
}
function Card(props) {
  return (
    <div className="m-7 bg-gradient-to-r from-red-800 to-pink-800 align-middle">
      <div className="width-full m-auto text-center">
        <img
          loading="lazy"
          className="dev-img m-auto h-auto w-1/2 p-3"
          src={props.img_url}
          alt="img"
        />
      </div>
      <div className="text-center text-2xl font-semibold">
        <p>{props.name}</p>
      </div>
      <div className="grid grid-cols-4 p-3">
        <a className="m-auto p-2 text-2xl" href={props.insta_id}>
          <FaInstagram />
        </a>
        <a className="m-auto p-2 text-2xl" href={props.linkedin_id}>
          <FaLinkedin />
        </a>
        <a className="m-auto p-2 text-2xl" href={props.contact}>
          <FaGithub />
        </a>
        <a className="m-auto p-2 text-2xl" href={props.portfolio}>
          <FaCode />
        </a>
      </div>
    </div>
  );
}
export default Meetdev;
