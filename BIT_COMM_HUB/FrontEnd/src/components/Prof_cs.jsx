import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import "./Prof_cs.css";
import Card2 from "./card2";
import { useNavigate } from "react-router-dom";
let id1;
function Pro_cs() {
	const navigate = useNavigate();
	function toBottom() {
		document.documentElement.scrollTop = document.documentElement.scrollHeight;
		// Or use document.body if the above doesn't work
		// document.body.scrollTop = document.body.scrollHeight;
	}

	const loggedInUsername = localStorage.getItem("userMain");
	const [data, setData] = useState([]);
	const [Chat, setChat] = useState("");
	const [MainUser, setUser] = useState("");
	if (loggedInUsername && MainUser !== loggedInUsername) {
		setUser(loggedInUsername);
	}
	const Jaldi_batao2 = localStorage.getItem("tech_stu");
	if (Jaldi_batao2 === "false") {
		id1 = "student";
	} else {
		id1 = "professor";
	}

	const getData = async () => {
		try {
			const response = await axios.get("http://localhost:3000/cs");
			// alert(response.data.id2);

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
		navigate("/pro_cs");
	};

	useEffect(() => {
		getData();
	}, []);
	const SendChat = () => {
		if (Chat === "") {
			return;
		}

		const url = "http://localhost:3000/create1";
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
	};
	function Sen() {
		if (Jaldi_batao2 == "false") {
			navigate("/Profu");
		} else {
			navigate("/Dash_teacher");
		}
	}
	return (
		<div>
			<div className="side_cs p-3 ml-4 hidden md:block">
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
			<div className="container  ">
				<div>
					<div className="text-center mb-8 text-2xl font-bold ">
						Room For interacting with CS's Proff.{" "}
					</div>

					{data &&
						data.map((item, index) =>
							item.id_net === "student" ? (
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

				<footer className="  ">
					<div className="down_input flex gap-8">
						<button className="" onClick={toBottom}>
							Go bottom
						</button>

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
					</div>
					{/* <button type="button" onClick={getData}>
						GEt
					</button> */}
				</footer>
				<br />
				<div className="mb-20"></div>
			</div>
		</div>
	);
}
export default Pro_cs;
