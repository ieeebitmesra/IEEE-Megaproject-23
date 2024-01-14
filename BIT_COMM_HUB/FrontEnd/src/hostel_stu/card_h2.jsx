import React, { useState } from "react";
import "./card_h.css";
//console.log({ chatMessage, user });
function Card_h2({ chatMessage, user, image }) {
	return (
		<div className={`Card_h2 text-sm mb-10`}>
			<img
				className="mt-0 mb-6 rounded-none Hostel_image"
				src={"http://localhost:3000/images2/" + image}
				alt=""
			/>
			<div className="font-bold mb-0">{user}</div> {chatMessage} <br />
		</div>
	);
}
export default Card_h2;
