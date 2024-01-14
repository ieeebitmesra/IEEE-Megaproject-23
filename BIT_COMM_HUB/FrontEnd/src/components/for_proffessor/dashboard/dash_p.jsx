import React, { useState, useEffect } from "react";
import Nav_p from "../nav_p/nav_p";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Dash_p() {
	const navigate = useNavigate();
	const [img_dash, setImage_dash] = useState();
	const pname = localStorage.getItem("Pname");
	useEffect(() => {
		axios
			.get("http://localhost:3000/getImage", {
				params: { pname },
			})
			.then((res) => setImage_dash(res.data.image))
			.catch((err) => console.log(err));
	});
	let id1;
	const Jaldi_batao2 = localStorage.getItem("tech_stu");
	if (Jaldi_batao2 === "true") {
		id1 = "professor";
	} else {
		id1 = "student";
	}

	function pro() {
		navigate("/ProfProfile");
	}
	function Student() {
		if (savedUserBranch_p === "CS") {
			navigate("/pro_cs");
		} else {
			alert(savedUserBranch_p);
		}
	}
	function hos_p() {
		navigate("/Hostel");
	}

	const savedUserName_p = localStorage.getItem("userMain_p");
	const savedUserEmail_p = localStorage.getItem("userEmail_p");
	const savedUserIncharge_p = localStorage.getItem("Incharge_p");
	const savedUserBranch_p = localStorage.getItem("userBranch_p");
	return (
		<div className="puraDash">
			<div className="z-10">
				<Nav_p />
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
								Hello {savedUserName_p} Sir
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
								<div className="imp text-lg font-bold ml-8 w-96">
									Solve Academic Doubts?
									{/* <button className="text-xl bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-3 ml-4  rounded border-2 border-white">
								Report
							</button> */}
								</div>
								<div className="imp text-lg font-bold ml-8 w-96">
									Solve Academic Doubts?
									{/* <button className="text-xl bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-3 ml-4  rounded border-2 border-white">
								Report
							</button> */}
								</div>
							</div>
							<div className="dono mt-2">
								<div
									onClick={Student}
									className="imp ml-20 text-lg font-bold w-96"
								>
									Anything to speak to Students ?
									{/* <button className="text-xl bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-3 ml-4 rounded border-2 border-white">
								Ask
							</button> */}
								</div>
								<div
									onClick={hos_p}
									className="imp text-lg font-bold ml-20 w-96"
								>
									Resolve Hostel or Mess Issue?
									{/* <button className="text-xl bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-3 ml-4  rounded border-2 border-white">
								Ask
							</button> */}
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
							<div className="text -lg  mt-4">Name : {savedUserName_p}</div>
							<div className="email t -lg  mt-2">
								Email : {savedUserEmail_p}
							</div>
							{/* <div className="batch text-center mt-2">{savedUserRoll_p}</div> */}
							<div className=" -lg mt-2">Depart. : {savedUserBranch_p}</div>
							<div className="text-center">
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
		</div>
	);
}
export default Dash_p;
