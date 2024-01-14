import React, { useEffect, useState } from "react";
import "./styling/signup.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
let u;
function Login() {
	useEffect(() => {
		localStorage.getItem("Pname");
	});
	const navigate = useNavigate();
	const [username, setUser] = useState("");
	const [password, setPass] = useState("");

	const handleLogin = () => {
		const url = "http://localhost:3000/login";
		const data = { username, password };

		localStorage.setItem("Pname", username);

		axios
			.post(url, data)
			.then((res) => {
				console.log(res.data);
				if (res.data.message) {
					alert(res.data.message);
					u = username;
					navigate("/UserProfile");
				}
			})
			.catch((err) => {
				console.error(err);
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
				<h1 className="text-5xl  mb-8 ">Log-In</h1>
				<hr className="mb-8" />
				<input
					className="mb-3 text-black"
					type="text"
					placeholder="UserName"
					value={username}
					onChange={(e) => setUser(e.target.value)}
					required
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
				<br />
				<button
					onClick={handleLogin}
					className=" text-lg bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4  rounded "
				>
					Login
				</button>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br /> <br />
			<br />
			<br />
		</div>
	);
}
export { u };
export default Login;
