import React from "react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import Sidebar from "./Sidebar";

const Navfunc = ({props}) => {
  const [isOpen, setIsOpen] = useState(props.present);
    const toggleNavbar = () =>(
        setIsOpen(!isOpen)
    )
    return(
      <>
      <nav>
        <div className="hidden lg:flex justify-center">
          <Sidebar />
        </div>
        <div className="lg:hidden">
          <button className="p-3" onClick={toggleNavbar}>{isOpen ? <FaRegWindowClose className="text-white" size={32} /> : <FaBars className="text-white" size={32}/>}</button>
        </div>
      </nav>
      {isOpen && (
        <div className="flex basis-full items-center">
          <Sidebar className=""/>
        </div>
      )}
      </>
    )
}
export default Navfunc