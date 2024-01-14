import React, { useState } from "react";
import axios from "axios";
import "./styling/signup.css";

import { Link, Navigate, useNavigate } from "react-router-dom";

function SinUp() {
	const navigate = useNavigate();
	const [username, setUser] = useState("");
	const [password, setPass] = useState("");

	const handleSignUp = () => {
		const url = "http://localhost:3000/signup"; // Corrected endpoint URL
		const data = { username, password };

		axios
			.post(url, data)
			.then((res) => {
				console.log(res.data);
				if (res.data.message) {
					alert(res.data.message);
					navigate("/");
				}
			})
			.catch((err) => {
				console.error(err); // Log the error for debugging
				alert("Server error occurred");
			});
	};

	return (
		<div className="signup2">
			<br />
			<br />
			<br />
			<br />
			<br />

			<div className="signup text-center">
				<h1 className="text-5xl  mb-8 ">
					SignUp To <br /> Log-In
				</h1>
				<hr className="mb-8" />
				<input
					className="mb-3 text-black "
					type="text"
					placeholder="UserName"
					value={username}
					onChange={(e) => setUser(e.target.value)}
				/>
				<br />
				<input
					className="mb-3 text-black"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPass(e.target.value)}
				/>
				<br />
				<input
					type="text"
					className="mb-3 text-black"
					placeholder="Mobile-No."
				/>
				<br />
				<button
					onClick={handleSignUp}
					className=" text-lg bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4  rounded "
				>
					Signup
				</button>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}

export default SinUp;
