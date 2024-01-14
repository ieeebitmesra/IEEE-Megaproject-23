import React from "react";
import "./card.css";
function Card2({ chatMessage, user }) {
	return (
		<div className={`Card2 text-sm `}>
			<div className="font-bold">{user}</div> {chatMessage}
		</div>
	);
}
export default Card2;
