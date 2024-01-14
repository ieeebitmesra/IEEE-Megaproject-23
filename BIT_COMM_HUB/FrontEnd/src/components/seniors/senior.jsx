import React, { useState, useEffect } from "react";
import img from "./sen (2).jpg";
import "./senior.css";
import { useNavigate } from "react-router-dom";
function Senior() {
	const [sen_stu, set_] = useState("");

	useEffect(() => {
		const senorStu = localStorage.getItem("sen_stu");

		if (senorStu) {
			set_(senorStu);
		}
	}, []);

	const handle = () => {
		localStorage.setItem("sen_stu", false);
	};
	const handle2 = () => {
		localStorage.setItem("sen_stu", true);
	};

	const savedUserRoll = localStorage.getItem("userRoll");

	// alert(savedUserRoll);
	const navigate = useNavigate();
	function move1() {
		handle();
		navigate("./alumini");
	}
	function moveK22() {
		handle();
		navigate("./K22");
	}
	function moveK21() {
		handle();
		navigate("./K21");
	}
	function moveK20() {
		handle();
		navigate("./K20");
	}
	function resJr() {
		handle2();
		if (savedUserRoll === "K22") {
			navigate("./K22");
		} else if (savedUserRoll === "K21") {
			navigate("./K21");
		} else if (savedUserRoll === "K20") {
			navigate("./K20");
		} else {
			navigate("./alumini");
		}
	}
	function Home() {
		navigate("/Dash");
	}
	return (
		<div className="total">
			<div className="text-3xl mb-8 mt-4 font-bold text-sky-600 ">
				Select the batch Of seniors for interaction
			</div>
			<div className="both ">
				<div className="mt-10">
					{savedUserRoll === "K23" && (
						<button
							onClick={moveK22}
							className="text-xl bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white"
						>
							K22
						</button>
					)}
					{(savedUserRoll === "K23" || savedUserRoll === "K22") && (
						<button
							onClick={moveK21}
							className="text-xl bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white"
						>
							K21
						</button>
					)}
					{(savedUserRoll === "K23" ||
						savedUserRoll === "K22" ||
						savedUserRoll === "K21") && (
						<button
							onClick={moveK20}
							className="text-xl bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white"
						>
							K20
						</button>
					)}
					{(savedUserRoll === "K23" ||
						savedUserRoll === "K22" ||
						savedUserRoll === "K21" ||
						savedUserRoll === "K20") && (
						<button
							onClick={move1}
							className="text-xl bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white"
						>
							K19
						</button>
					)}
					{savedUserRoll !== "K23" && (
						<button
							onClick={resJr}
							className="text-xl mt-10 bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white"
						>
							Respond To Jrs
						</button>
					)}
					<br />
					<button
						onClick={Home}
						className="text-xl bg-blue-500 mt-3 hover:bg-blue-900 text-white  py-2 px-3  rounded border-2 border-white"
					>
						Go Back
					</button>

					{/* {(savedUserRoll === "K22" ||
						savedUserRoll === "K21" ||
						savedUserRoll === "K20" ||
						savedUserRoll === "K19") && (
						<button className="text-xl bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white">
							J K23
						</button>
					)}
					{(savedUserRoll === "K19" ||
						savedUserRoll === "K21" ||
						savedUserRoll === "K20") && (
						<button className="text-xl bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white">
							J K22
						</button>
					)}
					{(savedUserRoll === "K19" || savedUserRoll === "K20") && (
						<button className="text-xl bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white">
							J K21
						</button>
					)}
					{savedUserRoll === "K19" && (
						<button className="text-xl bg-blue-600 mr-4 hover:bg-blue-900 text-white font-bold py-4 px-8  rounded border-2 border-white">
							J K20
						</button>
					)} */}
				</div>
				<img src={img} alt="" srcset="" />
			</div>
		</div>
	);
}
export default Senior;
