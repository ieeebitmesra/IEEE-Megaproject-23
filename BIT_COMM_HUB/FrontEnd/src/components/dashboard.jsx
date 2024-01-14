import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav2 from "./nav";
import axios from "axios";
import img3 from "./Proff-inter2.jpg";

import "./dashboard.css";
function Dashboard() {
	const savedUserSkill = localStorage.getItem("userSkill");

	const navigate = useNavigate();
	const [img_dash, setImage_dash] = useState();
	const loggedInUsername = localStorage.getItem("userMain");
	const Jaldi_batao = localStorage.getItem("tech_stu");
	// alert(Jaldi_batao);
	const savedUserEmail = localStorage.getItem("userEmail");
	const savedUserRoll = localStorage.getItem("userRoll");
	const savedUserBranch = localStorage.getItem("userBranch");
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

	const pname = localStorage.getItem("Pname");
	useEffect(() => {
		axios
			.get("http://localhost:3000/getImage", {
				params: { pname },
			})
			.then((res) => setImage_dash(res.data.image))
			.catch((err) => console.log(err));
	});

	return (
		<div className="puraDash">
			<div>
				<Nav2 />
			</div>
			<div className="compo z-10">
				<div className="sidecard  ml-12 p-8 ">
					<div className="heading text-2xl text-white">
						Important <br /> Links
						<hr className="mt-2" />
					</div>
					<div className="p-2 ">
						<ul>
							<li>
								<a href="https://www.bitmesra.ac.in/Visit_Other_Department_9910?cid=1&deptid=205&pid=103">
									Notice
								</a>
							</li>
							<li>
								<a href="https://erpportal.bitmesra.ac.in/login.htm">Erp</a>
							</li>
							<li>
								<a href="https://vfd83x.csb.app/">Club Detail</a>
							</li>
							<li>
								<a href="https://bitwelfaresociety.com/login">
									Welfare Society
								</a>
							</li>
							<li>
								<a href="https://www.bitmesra.ac.in/ContactUs.aspx?cid=1&pid=CT">
									Contact BIT
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="detPro">
					<div className="detImp">
						<div className="detail ">
							<div className="text-4xl font-bold p-3 text-white">
								Hello {loggedInUsername}
							</div>
							<br />
							<div className="text-2xl text-white">
								Welcome to BIT Communinty Hub{" "}
							</div>
							<br />
							<div className="">
								A digital space designed for learning, and connection. Dive in,
								explore, and let's make every interaction count.
							</div>
						</div>

						<div className=" necheKa mt-3">
							<div className=" mt-2 ">
								<div
									onClick={Hos}
									className="imp text-lg cursor-pointer font-bold ml-8 w-96"
								>
									Report Hostel or Mess Issue?
								</div>
								<div className="imp text-lg cursor-pointer font-bold ml-8 w-96">
									Having Academic Doubts?
								</div>
							</div>
							<div className="dono mt-2">
								<div
									onClick={Profu}
									className="imp cursor-pointer cursor-pointer ml-20 text-lg font-bold"
								>
									Anything to ask to Your Professors ?
								</div>
								<div
									onClick={Sen}
									className="imp ml-20  cursor-pointer text-lg font-bold"
								>
									Want to interact from seniors?
								</div>
							</div>
						</div>
					</div>
					<div className="smallProfile mr-10 ">
						<div className="picture">
							<img
								className="ml-8 mt-2 h-24 w-28"
								src={"http://localhost:3000/images/" + img_dash}
								alt=""
							/>
							<br />
							<hr />
						</div>
						<div className="ml-4">
							<div className="text- mt-2">Name : {loggedInUsername}</div>
							<div className="email -center mt-2">Email : {savedUserEmail}</div>
							<div className="batch -center mt-2">Batch : {savedUserRoll}</div>
							<div className=" text- mt-2">Branch : {savedUserBranch}</div>
						</div>
						<div className="text-center ">
							<button
								onClick={pro}
								className="border-2-white bg-blue-500 border-white p-2 rounded mt-3 text-center"
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Dashboard;
