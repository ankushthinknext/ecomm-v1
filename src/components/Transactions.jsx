import { Container, Grid, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "../config/axiosConfig";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Transactions() {
	const [allProducts, setAllProducts] = useState(null);
	const [productsByCategory, setProductsByCategory] = useState(null);
	const [value, setValue] = React.useState("1");

	useEffect(() => {
		axios("product/transaction").then((response) => {
			setAllProducts(response.data.data.all);
			setProductsByCategory(response.data.data.categories);
		});
	}, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container>
			<Grid container>
				<Grid items xs={12} lg={8}>
					<Paper>
						<Box sx={{ width: "100%", typography: "body1" }}>
							<TabContext value={value}>
								<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
									<TabList
										onChange={handleChange}
										aria-label="lab API tabs example">
										<Tab label="All" value="0" />
										{productsByCategory?.map((category, i) => (
											<Tab label={category.name} value={i + 1} />
										))}
									</TabList>
								</Box>
								<TabPanel value="0">
									<Grid container justifyContent="space-evenly">
										{allProducts?.map((product) => (
											<Card sx={{ width: "30%" }}>
												<CardMedia
													component="img"
													height="140"
													image={product.image}
													alt="green iguana"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="div">
														{product?.name}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{product?.description}
													</Typography>
												</CardContent>
												<CardActions>
													<Button size="small">{product?.price}</Button>
												</CardActions>
											</Card>
										))}
									</Grid>
								</TabPanel>
								{productsByCategory?.map((category, index) => (
									<TabPanel value={index + 1}>
										<Grid container justifyContent="space-evenly">
											{category.items?.map((product) => (
												<Card sx={{ width: "30%" }}>
													<CardMedia
														component="img"
														height="140"
														image={product.image}
														alt="green iguana"
													/>
													<CardContent>
														<Typography
															gutterBottom
															variant="h5"
															component="div">
															{product?.name}
														</Typography>
														<Typography variant="body2" color="text.secondary">
															{product?.description}
														</Typography>
													</CardContent>
													<CardActions>
														<Button size="small">{product?.price}</Button>
													</CardActions>
												</Card>
											))}
										</Grid>
									</TabPanel>
								))}
							</TabContext>
						</Box>
					</Paper>
				</Grid>
				<Grid items xs={12} lg={4}>
					<Paper>cart</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Transactions;
