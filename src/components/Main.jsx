import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import moment from "moment";
import qs from "query-string";
import {
	Container,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Line } from "react-chartjs-2";

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
	const [recentTransaction, setrecentTransaction] = useState(null);
	const [query, setQuery] = useState({
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
		limit: 5,
		sort: "Newest",
	});
	const data = {
		labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		datasets: [
			{
				label: "# of Votes",
				data: dashboardData && [
					dashboardData?.items.find((el) => el._id == 1)?.grandtotal,
					dashboardData?.items.find((el) => el._id == 2)?.grandtotal,
					dashboardData?.items.find((el) => el._id == 3)?.grandtotal,
					dashboardData?.items.find((el) => el._id == 4)?.grandtotal,
					dashboardData?.items.find((el) => el._id == 5)?.grandtotal,
					dashboardData?.items.find((el) => el._id == 6)?.grandtotal,
					dashboardData?.items.find((el) => el._id == 7)?.grandtotal,
				],
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
	console.log(query);
	console.log(recentTransaction);

	useEffect(() => {
		axios(`transaction/dashboard?${qs.stringify(query)}`).then((response) =>
			setDashboardData(response.data.data),
		);
		axios(`transaction?${qs.stringify(query)}`).then((response) =>
			setrecentTransaction(response.data.data.transactions),
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
								Income - {dashboardData?.total.toFixed(2)}
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
					<Grid item xs={12} lg={6}>
						<Paper>
							{recentTransaction && (
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>Receipt Number</TableCell>
											<TableCell>Data</TableCell>
											<TableCell>Quantity</TableCell>
											<TableCell>Total</TableCell>
										</TableRow>
									</TableHead>
									<TableBody style={{ height: "200px", overflow: "scroll" }}>
										{recentTransaction.map((transaction) => (
											<TableRow>
												<TableCell>{transaction._id}</TableCell>
												<TableCell>
													{moment(transaction.createdAt).format("llll")}
												</TableCell>
												<TableCell>{transaction.items.length}</TableCell>
												<TableCell>
													{transaction.grandtotal.toFixed(2)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Main;
