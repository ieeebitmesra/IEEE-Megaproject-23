import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card_h from "./card_h";
import Card_h2 from "./card_h2";
function Hostel() {
	const navigate = useNavigate();
	const Jaldi_batao2 = localStorage.getItem("tech_stu");
	const [data2, setData2] = useState([]);
	const [chat_h, setChat_h] = useState("");
	const pname = localStorage.getItem("userMain");
	const [file, setFile] = useState(null);
	const savedUserSkill = localStorage.getItem("userSkill");
	const Jaldi_batao = localStorage.getItem("tech_stu");

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:3000/getImage_h");
			if (
				response.data &&
				response.data.chatMessages &&
				response.data.userxx &&
				response.data.id2
			) {
				const combinedData = response.data.chatMessages.map(
					(chatMessage, index) => ({
						chatMessage,
						user: response.data.userxx[index],
						id_net: response.data.id2[index],
						data_ab: response.data.t_f[index],
					})
				);
				setData2(combinedData);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleUpload = async () => {
		const formdata = new FormData();
		formdata.append("file", file);

		try {
			const response = await axios.post(
				"http://localhost:3000/upload_h",
				formdata,
				{
					params: { pname_h: pname, chat_h: chat_h, tf: Jaldi_batao },
				}
			);
			console.log(response.data);
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	useEffect(() => {
		console.log("Updated data2:", data2);
	}, [data2]);
	useEffect(() => {
		fetchData();
	}, []);
	function Sen() {
		if (Jaldi_batao2 == "false") {
			navigate("/Dash");
		} else {
			navigate("/Dash_teacher");
		}
	}
	return (
		<div className="container">
			<div className="side_cs p-3 ml-4 hidden md:block">
				<div className="font-bold">!!!!</div>
				<div>
					This is a formal platform to share issues in Hostel as well as Mess{" "}
					<br />
					Try to maintain the decoram
					<br />
					<button
						onClick={Sen}
						className="text-xl bg-blue-600 mt-3 hover:bg-blue-900 text-white  py-2 px-3  rounded border-2 border-white"
					>
						Go Back
					</button>
				</div>
			</div>

			<div className="text-2xl font-bold text-center mb-8">
				Discussion Room for your Hostel No. - {savedUserSkill}
			</div>
			<div className="down_input text-center">
				<form action="">
					<input
						placeholder="chat"
						type="text"
						value={chat_h}
						onChange={(e) => setChat_h(e.target.value)}
					/>
					<input
						type="file"
						onChange={(e) => setFile(e.target.files[0])}
					></input>
					<button onClick={handleUpload}>Send</button>
				</form>
			</div>
			<div className="">
				{data2 &&
					data2.map((item, index) =>
						item.data_ab === "false" ? (
							<Card_h
								chatMessage={item.chatMessage}
								user={item.user}
								image={item.id_net}
								key={index}
							/>
						) : (
							<Card_h2
								chatMessage={item.chatMessage}
								user={item.user}
								image={item.id_net}
								key={index}
							/>
						)
					)}
				<br />
				<br />
			</div>
		</div>
	);
}
export default Hostel;
