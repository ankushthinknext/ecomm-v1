import React from "react";
import Sidebar from "../components/Sidebar";
import "./dashboard.css";

export default function Dashboard() {
	return (
		<div className="m-dashboard">
			<div className="m-sidebar-wrapper">
				<Sidebar />
			</div>
			<div className="m-main-wrapper"></div>
		</div>
	);
}
