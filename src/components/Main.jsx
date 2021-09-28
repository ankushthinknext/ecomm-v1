import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import moment from "moment";
import qs from "query-string";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Line } from "react-chartjs-2";

const data = {
	labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	datasets: [
		{
			label: "# of Votes",
			data: [100, 190, 3, 5, 2, 3, 3],
			fill: false,
			backgroundColor: "#f3a7bd",
			borderColor: "rgba(255, 99, 132, 0.2)",
			fill: true,
		},
	],
};

const options = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
				},
			},
		],
	},
};

const useStyle = makeStyles({
	mPanel: {
		height: "100px",
		margin: "5px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& h5": {
			color: "white",
		},
	},
});

function Main() {
	const classes = useStyle();
	const [dashboardData, setDashboardData] = useState(null);
	const [query, setQuery] = useState({
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
	});
	console.log(query);
	console.log(dashboardData);
	useEffect(() => {
		axios(`transaction/dashboard?${qs.stringify(query)}`).then((response) =>
			setDashboardData(response.data.data),
		);
	}, []);

	return (
		<div>
			<Container>
				<Grid container>
					<Grid item xs={12} lg={4}>
						<Paper
							style={{
								background: `linear-gradient(
16deg, rgba(234,81,121,1) 0%, rgba(172,54,115,1) 100%)`,
							}}
							className={classes.mPanel}>
							<Typography variant="h5" gutterBottom>
								Transactions - {dashboardData?.count}
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} lg={4}>
						<Paper
							style={{
								background: `linear-gradient(
16deg, rgba(195,84,215,1) 0%, rgba(136,74,206,1) 100%)`,
							}}
							className={classes.mPanel}>
							<Typography variant="h5" gutterBottom>
								Income - {dashboardData?.total}
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} lg={4}>
						<Paper
							style={{
								background: `linear-gradient(16deg, rgba(245,90,158,1) 0%, rgba(255,155,106,1) 100%)`,
							}}
							className={classes.mPanel}>
							<Typography variant="h5" gutterBottom>
								Products - {dashboardData?.qty}
							</Typography>
						</Paper>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs={12} lg={6}>
						<Paper>
							<Line data={data} options={options} />
						</Paper>
					</Grid>
					<Grid item xs={12} lg={6}></Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Main;
