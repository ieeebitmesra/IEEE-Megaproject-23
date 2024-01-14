import React, { useState, useEffect } from "react";
import Nav_p from "../nav_p/nav_p";
import "./profile_p.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
var Main4;
const tag = "prof";
let department;
function Profile_p() {
	const [userMain_p, setuserMain_p] = useState("");
	const [userEmail_p, setuserEmail_p] = useState("");
	const [Incharge_p, setuserIncharge_p] = useState("1");
	const [userBranch_p, setuserBranch_p] = useState("CS");
	const [userSkill_p, setuserSkill_p] = useState("");

	useEffect(() => {
		const savedUserName_p = localStorage.getItem("userMain_p");
		const savedUserEmail_p = localStorage.getItem("userEmail_p");
		const savedUserIncharge_p = localStorage.getItem("Incharge_p");
		const savedUserBranch_p = localStorage.getItem("userBranch_p");
		const savedUserSkill_p = localStorage.getItem("userSkill_p");

		if (savedUserName_p) {
			setuserMain_p(savedUserName_p);
		}
		if (savedUserEmail_p) {
			setuserEmail_p(savedUserEmail_p);
		}
		if (savedUserIncharge_p) {
			setuserIncharge_p(savedUserIncharge_p);
		}
		if (savedUserBranch_p) {
			setuserBranch_p(savedUserBranch_p);
		}

		if (savedUserSkill_p) {
			setuserSkill_p(savedUserSkill_p);
		}
	}, []);

	const handleSave = (e) => {
		e.preventDefault();
		localStorage.setItem("userMain_p", userMain_p);
		localStorage.setItem("userEmail_p", userEmail_p);
		localStorage.setItem("Incharge_p", Incharge_p);
		localStorage.setItem("userBranch_p", userBranch_p);
		department = userBranch_p;
		Main4 = userMain_p;
		navigate("./Dash_teacher");
	};

	const [imgMain, setImage] = useState(null);
	const pname = localStorage.getItem("Pname");

	const [file, setFile] = useState(null);
	const handleUpload = () => {
		const formdata = new FormData();
		formdata.append("file", file);

		axios
			.post("http://localhost:3000/upload", formdata, {
				params: { pname }, // send pname as a query parameter or in the body
			})
			.then((res) => setImage(res.data.image))
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		axios
			.get("http://localhost:3000/getImage", {
				params: { pname },
			})
			.then((res) => setImage(res.data.image))
			.catch((err) => console.log(err));
	});

	// const handleSave = () => {
	// 	alert(userMain_p);
	// 	localStorage.setItem("userMain", userMain_p);
	// 	localStorage.setItem("userEmail", userEmail_p);
	// 	localStorage.setItem("Incharge", Incharge_p);
	// 	localStorage.setItem("userBranch", userBranch_p);

	// 	localStorage.setItem("userSkill", userSkill_p);
	// };
	const navigate = useNavigate();
	useEffect(() => {}, [userMain_p]);
	if (userBranch_p === "CS") {
		Main4 = userMain_p;
		department = userBranch_p;
	}
	return (
		<div>
			<Nav_p />
			<div className="sidenav mt-4 hidden md:block">
				<div className="profile">
					<div className="font-bold mt-2 text-xl text-center ">
						{" "}
						<span className="border-2  p-2 rounded-3">Profile Image</span>
					</div>
					<img
						className="ml-14 mt-8 mb-6 h-28 w-32 "
						src={"http://localhost:3000/images/" + imgMain}
						alt=""
						width="100"
						height="100"
					/>
					<div className="image">
						<input
							type="file"
							onChange={(e) => setFile(e.target.files[0])}
						></input>
					</div>
					<br />
					<button
						className="border-2 rounded-2 text-white p-1 bg-blue-500 font-bold"
						onClick={handleUpload}
					>
						Upload Photo
					</button>
					<br />
					<br />

					<div className="job">🔥BITIAN🔥</div>
				</div>

				<div className="sidenav-url">
					<div className="url">
						<a className="active">Profile</a>
						<hr align="center" />
					</div>
				</div>
			</div>

			<div className="main">
				<h2>IDENTITY</h2>
				<div className="card">
					<form action="">
						<div className="card-body">
							<i className="fa fa-pen fa-xs edit"></i>
							<table>
								<tbody>
									<tr>
										<td>Name</td>
										<td>:</td>
										<td>
											<input
												value={userMain_p}
												type="text"
												placeholder="USER"
												onChange={(e) => setuserMain_p(e.target.value)}
												required
											/>
										</td>
									</tr>
									<tr>
										<td>Email</td>
										<td>:</td>
										<td>
											<input
												value={userEmail_p}
												type="email"
												onChange={(e) => setuserEmail_p(e.target.value)}
												placeholder="abc@gmail.com"
												required
											/>
										</td>
									</tr>
									<tr>
										<td>Hostel Incharge</td>
										<td>:</td>
										<td>
											<select
												value={Incharge_p}
												type="Hostel Incharge"
												onChange={(e) => setuserIncharge_p(e.target.value)}
												placeholder="abc@gmail.com"
												required
											>
												<option value="H1">H1</option>
												<option value="H2">H2</option>
												<option value="H3">H3</option>
												<option value="H4">H4</option>

												<option value="NA">Not Applicable</option>
											</select>
										</td>
									</tr>

									<tr>
										<td>Department</td>
										<td>:</td>
										<td>
											<select
												value={userBranch_p}
												type="text"
												onChange={(e) => setuserBranch_p(e.target.value)}
												placeholder="Branch"
												required
											>
												<option value="CS">CS</option>
												<option value="ECE">ECE</option>
												<option value="EE">EE</option>
												<option value="Mech">Mech</option>
											</select>
										</td>
									</tr>
								</tbody>
							</table>
							<button
								className="text-xl bg-blue-600 mt-3 hover:bg-blue-900 text-white  py-2 px-3  rounded border-2 border-white"
								type="submit"
								onClick={handleSave}
							>
								save
							</button>
							{/* */}
						</div>
					</form>
				</div>

				<h2>SOCIAL MEDIA</h2>
				<div className="card">
					<div className="card-body">
						<i className="fa fa-pen fa-xs edit"></i>
						<div className="social-media">
							<span className="fa-stack fa-sm">
								<i className="fas fa-circle fa-stack-2x"></i>
								<i className="fab fa-facebook fa-stack-1x fa-inverse"></i>
							</span>
							<span className="fa-stack fa-sm">
								<i className="fas fa-circle fa-stack-2x"></i>
								<i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
							</span>
							<span className="fa-stack fa-sm">
								<i className="fas fa-circle fa-stack-2x"></i>
								<i className="fab fa-instagram fa-stack-1x fa-inverse"></i>
							</span>
							<span className="fa-stack fa-sm">
								<i className="fas fa-circle fa-stack-2x"></i>
								<i className="fab fa-invision fa-stack-1x fa-inverse"></i>
							</span>
							<span className="fa-stack fa-sm">
								<i className="fas fa-circle fa-stack-2x"></i>
								<i className="fab fa-github fa-stack-1x fa-inverse"></i>
							</span>
							<span className="fa-stack fa-sm">
								<i className="fas fa-circle fa-stack-2x"></i>
								<i className="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
							</span>
							<span className="fa-stack fa-sm">
								<i className="fas fa-circle fa-stack-2x"></i>
								<i className="fab fa-snapchat fa-stack-1x fa-inverse"></i>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export { Main4, department, tag };
export default Profile_p;
