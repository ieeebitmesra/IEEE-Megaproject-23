import React, { useState, useEffect } from "react";
import axios from "axios";
import "./alumini.css";
import Card from "../../card";
import Card2 from "../../card2";
import { useNavigate } from "react-router-dom";
let id1;
function Alumini() {
	const navigate = useNavigate();
	const loggedInUsername = localStorage.getItem("userMain");
	const [data, setData] = useState([]);
	const [Chat, setChat] = useState("");
	const [MainUser, setUser] = useState("");
	if (loggedInUsername && MainUser !== loggedInUsername) {
		setUser(loggedInUsername);
	}
	const Jaldi_batao2 = localStorage.getItem("sen_stu");
	if (Jaldi_batao2 === "false") {
		id1 = "junior";
	} else {
		id1 = "senior";
	}
	const getData = async () => {
		try {
			const response = await axios.get("http://localhost:3000/al");
			const combinedData = response.data.chatMessages.map(
				(chatMessage, index) => ({
					chatMessage,
					user: response.data.userxx[index],
					id_net: response.data.id2[index],
				})
			);
			setData(combinedData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		getData();
	// 	}, 1000);
	// });
	const SendChat = () => {
		if (Chat === "") {
			alert("cant send empty message");

			return;
		}
		const url = "http://localhost:3000/senior";
		const data = { Chat, MainUser, id1 };
		axios
			.post(url, data)
			.then((res) => {
				if (res.data.message) {
					setChat("");
				}
			})
			.catch((err) => {
				console.error(err);
				alert("Server error occurred");
			});
		navigate("/Seniors/alumini");
	};
	useEffect(() => {
		getData();
	}, []);
	function Sen() {
		navigate("/Seniors");
	}
	return (
		<div>
			<div className="text-center font-bold text-2xl">
				Room For Alumini Interaction
			</div>
			<div className="container  ">
				<div>
					<div className="side_cs p-3 ml-4  xs:block">
						<div className="font-bold">!!!!</div>
						<div>
							This is a formal platform to share thoughts, ideas ,Doubts of
							respective depart. <br />
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
					{data &&
						data.map((item, index) =>
							item.id_net === "junior" ? (
								<Card
									chatMessage={item.chatMessage}
									user={item.user}
									key={index}
								/>
							) : (
								<Card2
									chatMessage={item.chatMessage}
									user={item.user}
									key={index}
								/>
							)
						)}
				</div>
				<footer className="down_input ">
					<form action="">
						<input
							className=""
							type="text"
							placeholder="Chat"
							value={Chat}
							onChange={(e) => setChat(e.target.value)}
							required
						/>
						<button type="submit" onClick={SendChat}>
							Send
						</button>
					</form>
				</footer>
				<div className="mb-10"></div>
			</div>
		</div>
	);
}
export default Alumini;
