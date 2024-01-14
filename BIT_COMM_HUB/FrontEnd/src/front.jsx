import "./front.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Img from "./images/img4.jpg";

function App2() {
	useEffect(() => {
		const Jaldi_batao = localStorage.getItem("tech_stu");
	}, []);
	const navigate = useNavigate();
	const teleport1 = () => {
		navigate("/Signup");
	};
	const teleport2 = () => {
		localStorage.setItem("tech_stu", false);

		navigate("/Login");
	};
	const teleportTeacher = () => {
		localStorage.setItem("tech_stu", true);

		navigate("/Login_p");
	};
	function about() {
		navigate("/About");
	}
	function cont() {
		navigate("/Team");
	}
	return (
		<>
			<div className="cont2">
				<div className="">
					<header className="bg-[#FFFFFF30] px-12 h-20   ">
						<nav className="mt-3 text-black flex items-center justify-between">
							<h2 className="text-2xl  border-2 px-2 py-2">
								BIT Community Hub
							</h2>
							<div>
								<ul className="flex flex-row  gap-8 text-xl">
									<li className="hover:text-blue-800 cursor-pointer">Home</li>
									<li
										onClick={about}
										className="hover:text-blue-800 cursor-pointer"
									>
										About
									</li>
									<li
										onClick={cont}
										className="hover:text-blue-800 cursor-pointer"
									>
										Contact
									</li>
									<li>
										<button
											onClick={teleport1}
											className=" bg-blue-800 hover:bg-blue-900 text-white  rounded border-2 border-white"
										>
											SignIn
										</button>
									</li>
								</ul>
							</div>
						</nav>
					</header>
					<div className="flex flex-row">
						{" "}
						{/* Flex container */}
						<div className="writing">
							<h1 className="text-3xl font-bold mt-10">
								<p>
									<h1 className="ignite">
										{" "}
										"Fueling Desire for Solutions: Ignite Change at the
									</h1>
								</p>
								<p>
									<h1 className="bit mt-4">BIT Community Hub </h1>
								</p>

								<p className="ml-24 gate font-thin">Your Gateway to</p>
								<p className="ml-40 mt-4 success"> "SUCCESS"</p>
							</h1>
						</div>
						<div className="bitImageContainer">
							{" "}
							<img
								className="bitImage hidden lg:block"
								src={Img}
								alt="Success"
							/>
						</div>
					</div>
					<div className="ml-20  ">
						{" "}
						<button
							onClick={teleport2}
							className="text-xl mr-20 bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white"
						>
							Login as Student
						</button>
						<button
							onClick={teleportTeacher}
							className="text-xl bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white"
						>
							Login as teacher
						</button>
					</div>
					<br />

					<div className="SineIn text-2xl ml-40">
						New users please{" "}
						<button
							onClick={teleport1}
							className=" bg-blue-800 hover:bg-blue-900 text-white py-3 px-6  rounded border-2 border-white"
						>
							SignIn
						</button>
					</div>
					<br />
				</div>
			</div>
		</>
	);
}

export default App2;
