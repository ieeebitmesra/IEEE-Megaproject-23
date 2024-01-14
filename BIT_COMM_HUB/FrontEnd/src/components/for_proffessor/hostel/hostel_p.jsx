import React, { useState, useEffect } from "react";
import axios from "axios";

function Hostel_p() {
	const [data2, setData2] = useState([]);
	const [chat_h, setChat_h] = useState("");
	const pname = localStorage.getItem("userMain");
	const [file, setFile] = useState(null);
	const savedUserSkill = localStorage.getItem("userSkill");

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
					params: { pname_h: pname, chat_h: chat_h },
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
	const Jaldi_batao = localStorage.getItem("tech_stu");

	return (
		<div className="container">
			<div className="text-2xl font-bold text-center mb-8">
				Discussion Room for your Hostel No. - {savedUserSkill}
			</div>
			<div className="down_input">
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
					<button onClick={handleUpload}>upload</button>
					<button>get</button>
				</form>
			</div>
			<div className="">
				{/* {data2 &&
					data2.map((item, index) =>
						item.id_net === "student" ? (
							<Card_h
								chatMessage={item.chatMessage}
								user={item.user}
								image={item.id_net}
								key={index}
							/>
						) : (
							<Card_h
								chatMessage={item.chatMessage}
								user={item.user}
								image={item.id_net}
								key={index}
							/>
						)
					)} */}
			</div>
		</div>
	);
}
export default Hostel_p;
