import React from "react";
import "./team.css";
import img from "./personalpic.jpg";
function Team() {
	return (
		<div className="teambody">
			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
			/>
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap"
			/>

			<div className="team-section">
				<div className="team-member">
					<div className="text-2xl font-bold">Contact Creator</div>
					<img className="mb-4 mt-8" src={img} alt="Team Member 2" />
					<h3>Vaibhav Kr. Gupta</h3>
					<p className="role">Developer</p>Btech ECE <br />
					II yr. <br />
					<br />
					<a href="#" className="fa fa-facebook"></a>
					<a href="#" className="fa fa-github"></a>
					<a href="#" className="fa fa-linkedin"></a>
				</div>
			</div>
		</div>
	);
}
export default Team;
