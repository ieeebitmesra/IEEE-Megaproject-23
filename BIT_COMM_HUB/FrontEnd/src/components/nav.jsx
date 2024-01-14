import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiAcademicCap } from "react-icons/hi";

import { CgProfile } from "react-icons/cg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./nac.css";
function Nav2() {
	const savedUserSkill = localStorage.getItem("userSkill");

	const navigate = useNavigate();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const toggleDropdown = () => {
		setIsDropdownOpen((prevState) => !prevState);
	};
	function pro() {
		navigate("/UserProfile");
	}
	function Home() {
		navigate("/Dash");
	}
	function Profu() {
		navigate("/Profu");
	}
	function Sen() {
		navigate("/Seniors");
	}
	function Hos() {
		if (savedUserSkill === "an") {
			alert("Not applicable for DayScholars");
		} else {
			navigate("/Hostel");
		}
	}

	return (
		<header className=" shadow ">
			<nav className="nav2 flex items-center justify-between p-8 h-20 ">
				{" "}
				<div className="text-2xl  font-bold border-4 p-2 border-black shadow">
					BIT Comm. Hub
				</div>
				<div className="beechKa hidden md:block mt-8  ">
					<ul className="flex gap-10">
						<li className="text-3xl icon cursor-pointer hover:text-purple-700">
							<div title="Home" onClick={Home}>
								<FaHome />
							</div>
						</li>
						<li className="text-3xl icon cursor-pointer hover:text-purple-700">
							<div title="Professor Interaction " onClick={Profu}>
								<FaChalkboardTeacher />
							</div>
						</li>
						<li className="text-3xl icon cursor-pointer hover:text-purple-700">
							<div title="Senior Interaction" onClick={Sen}>
								<FaPeopleGroup />
							</div>
						</li>
						<li
							onClick={Hos}
							className="text-3xl icon cursor-pointer hover:text-purple-700"
						>
							<div title="Hostel Issue">
								<BiSolidBuildingHouse />
							</div>
						</li>
						<li className="text-3xl icon cursor-pointer hover:text-purple-700">
							<div title="Academic Doubt">
								<HiAcademicCap />
							</div>
						</li>
					</ul>
				</div>
				<div
					className=" flex gap-4  text-5xl cursor-pointer text-black  "
					title="Message"
				>
					<div className="hidden icon md:block" onClick={pro}>
						<CgProfile />
					</div>
				</div>
				{isDropdownOpen && (
					<div
						className="drop absolute  bg-blue-100 w-full left-0 z-100 md:hidden"
						style={{
							border: "1px solid black ",
							borderTop: "0px",
							borderRadius: "20px",
							marginTop: "382px",
						}}
					>
						<ul className="flex flex-col items-center gap-6">
							<li
								className="mt-4 hover:text-purple-500 cursor-pointer "
								onClick={Home}
							>
								Home
							</li>
							<li
								className="hover:text-purple-500 cursor-pointer "
								onClick={Profu}
							>
								Professor Interaction
							</li>
							<li
								onClick={Sen}
								className="hover:text-purple-500 cursor-pointer "
							>
								Senior Interaction
							</li>
							<li
								onClick={Hos}
								className="hover:text-purple-500 cursor-pointer "
							>
								Hostel Issue
							</li>
							<li className=" hover:text-purple-500 cursor-pointer ">
								Academic Doubts
							</li>
							<li
								className="hover:text-purple-500 cursor-pointer  mb-2"
								onClick={pro}
							>
								Profile
							</li>
						</ul>
					</div>
				)}
				<div
					className="butt icon text-2xl md:hidden cursor-pointer hover:text-purple-700"
					onClick={toggleDropdown}
				>
					<FiAlignJustify />
				</div>
			</nav>
		</header>
	);
}

export default Nav2;
