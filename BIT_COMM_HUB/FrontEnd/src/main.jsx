import React from "react";
import Login from "./login.jsx";
import SinUp from "./sineUp.jsx";
import { createRoot } from "react-dom/client";
import Welcome from "./welcome.jsx";
import App2 from "./front.jsx";
import Profile from "./components/profile.jsx";
import Dashboard from "./components/dashboard.jsx";
import Professor from "./components/professor.jsx";
import Pro_cs from "./components/Prof_cs.jsx";
import Senior from "./components/seniors/senior.jsx";
import Alumini from "./components/seniors/alumini/alumini.jsx";
import K22 from "./components/seniors/K22/k22.jsx";
import K21 from "./components/seniors/K21/k21.jsx";
import K20 from "./components/seniors/K20/k20.jsx";
import Hostel from "./hostel_stu/hostel.jsx";
import Login_p from "./components/for_proffessor/Login/login_p.jsx";
import "./index.css";
import About from "./about.jsx";
import Team from "./team.jsx";

import Hostel_p from "./components/for_proffessor/hostel/hostel_p.jsx";
import Dash_p from "./components/for_proffessor/dashboard/dash_p.jsx";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from "react-router-dom";
import Profile_p from "./components/for_proffessor/Profile_p/profile_p.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App2 />,
	},
	{
		path: "/Login",
		element: <Login />,
	},
	{
		path: "/Login_p",
		element: <Login_p />,
	},
	{
		path: "/Signup",
		element: <SinUp />,
	},
	{
		path: "/wel",
		element: <Welcome />,
	},
	{
		path: "/UserProfile",
		element: <Profile />,
	},
	{
		path: "/Dash",
		element: <Dashboard />,
	},
	{
		path: "/UserProfile/Dash",
		element: <Dashboard />,
	},
	{
		path: "/Profu",
		element: <Professor />,
	},
	{
		path: "/pro_cs",
		element: <Pro_cs />,
	},
	{
		path: "/Seniors",
		element: <Senior />,
	},
	{
		path: "/Dash_teacher",
		element: <Dash_p />,
	},
	{
		path: "/ProfProfile/Dash_teacher",
		element: <Dash_p />,
	},
	{
		path: "/ProfProfile",
		element: <Profile_p />,
	},
	{
		path: "/Seniors/alumini",
		element: <Alumini />,
	},
	{
		path: "/Seniors/K22",
		element: <K22 />,
	},
	{
		path: "/Seniors/K21",
		element: <K21 />,
	},
	{
		path: "/Seniors/K20",
		element: <K20 />,
	},
	{
		path: "/Hostel",
		element: <Hostel />,
	},
	{
		path: "/Hostel_p",
		element: <Hostel_p />,
	},
	{
		path: "/team",
		element: <Team />,
	},
	{
		path: "/About",
		element: <About />,
	},
]);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
