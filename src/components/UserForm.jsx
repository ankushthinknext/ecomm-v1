import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

const UserForm = ({ history }) => {
	return (
		<div>
			<Container component="main" maxWidth="lg">
				<Button
					onClick={() => {
						history.goBack();
					}}>
					Back
				</Button>
				<Paper style={{ padding: "10px 20px", margin: "20px 0" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						<Box component="form" noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="fullname"
										required
										fullWidth
										id="firstName"
										label="Full Name"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										fullWidth
										id="lastName"
										label="User Name"
										name="username"
										autoComplete="lname"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="email"
										required
										fullWidth
										id="firstName"
										label="Email Address"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										fullWidth
										id="lastName"
										label="Password"
										type="password"
										name="password"
										autoComplete="Pa"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormControl fullWidth variant="outlined">
										<InputLabel htmlFor="uncontrolled-native">Age</InputLabel>
										<NativeSelect
											defaultValue={30}
											inputProps={{
												name: "role",
												id: "uncontrolled-native",
											}}>
											<option value="Admin">Admin</option>
											<option value="Cashier">Cashier</option>
										</NativeSelect>
									</FormControl>
								</Grid>
							</Grid>

							<Grid container justifyContent="flex-end">
								<Grid item xs={12} lg={3}>
									<Button
										className="m-btn m-btn-lg m-btn-rounded"
										type="submit"
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}>
										Sign Up
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Paper>
			</Container>
		</div>
	);
};

export default UserForm;
