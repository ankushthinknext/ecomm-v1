import React, { useEffect } from "react";
import axios from "../config/axiosConfig";

function Main() {
	useEffect(() => {
		axios("transaction/dashboard").then((response) =>
			console.log(response.data),
		);
	}, []);
	return (
		<div>
			<h3>Main</h3>
		</div>
	);
}

export default Main;
