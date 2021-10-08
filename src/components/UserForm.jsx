import React, { useState, useEffect } from "react";
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
import axios from "../config/axiosConfig";
import Joi from "joi-browser";
import Swal from "sweetalert2";

const UserForm = ({ history, match }) => {
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState(null);
	const [mode, setMode] = useState("CREATE");
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		let userId = match.params.id;
		axios(`user/${userId}`).then((response) => {
			if (response.status == 200) {
				setFormData(response.data.data);
				setMode("UPDATA");
			}
		});
	}, []);

	const formSchema = {
		username: Joi.string().min(7).max(30).required().label("User Name"),
		fullname: Joi.string().min(3).max(30).required().label("Full Name"),
		password:
			mode === "CREATE"
				? Joi.string().min(7).max(30).required().label("Password")
				: Joi.string().min(7).max(30).label("Password"),
		role: Joi.string().min(3).max(30).required(),
		email: Joi.string().email().min(7).max(30).required().label("Email"),
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		//validatino
		let result = Joi.validate(formData, formSchema, { abortEarly: false });
		if (result.error) {
			setErrors(result.error.details);
		} else {
			setErrors(null);
			if (mode === "CREATE") {
				axios.post("user", formData).then((res) => {
					if (res.status === 200) {
						Swal.fire("Create!", "User created!", "success");
						history.push("/dashboard/users");
					} else {
						Swal.fire("Opps!", "Something went wrong...", "error");
					}
				});
			} else {
				axios.put(`user/${match.params.id}`, formData).then((res) => {
					if (res.status === 200) {
						Swal.fire("Update!", "User updated!", "success");
						history.push("/dashboard/users");
					} else {
						Swal.fire("Opps!", "Something went wrong...", "error");
					}
				});
			}
		}

		//api call
	};

	console.log(formData);

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
					<form onSubmit={handleSubmit} onChange={handleChange}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}>
							<Box noValidate sx={{ mt: 3 }}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											autoComplete="fname"
											name="fullname"
											fullWidth
											id="firstName"
											label="Full Name"
											autoFocus
											InputLabelProps={{
												shrink: formData ? true : false,
											}}
											value={formData?.fullname}
											error={
												errors &&
												errors.find((er) => er.context.key === "fullname")
											}
											helperText={
												errors &&
												errors.map(
													(err) =>
														err.context.key === "fullname" && err.message,
												)
											}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											label="User Name"
											name="username"
											autoComplete="lname"
											value={formData?.username}
											InputLabelProps={{
												shrink: formData ? true : false,
											}}
											error={
												errors &&
												errors.find((er) => er.context.key === "username")
											}
											helperText={
												errors &&
												errors.map(
													(err) =>
														err.context.key === "username" && err.message,
												)
											}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											autoComplete="fname"
											name="email"
											fullWidth
											label="Email Address"
											autoFocus
											value={formData?.email}
											InputLabelProps={{
												shrink: formData ? true : false,
											}}
											error={
												errors &&
												errors.find((er) => er.context.key === "email")
											}
											helperText={
												errors &&
												errors.map(
													(err) => err.context.key === "email" && err.message,
												)
											}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											id="lastName"
											label="Password"
											type="password"
											name="password"
											autoComplete={false}
											InputLabelProps={{
												shrink: formData ? true : false,
											}}
											error={
												errors &&
												errors.find((er) => er.context.key === "password")
											}
											value={formData?.password}
											helperText={
												errors &&
												errors.map(
													(err) =>
														err.context.key === "password" && err.message,
												)
											}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<FormControl
											fullWidth
											variant="outlined"
											formHelperText={
												errors &&
												errors.map(
													(err) => err.context.key === "role" && err.message,
												)
											}>
											<InputLabel htmlFor="uncontrolled-native">
												Role
											</InputLabel>
											<NativeSelect
												inputProps={{
													name: "role",
													id: "uncontrolled-native",
												}}>
												<option
													selected={
														mode == "CREATE" &&
														formData &&
														formData.role === "Admin"
													}
													value="Admin">
													Admin
												</option>
												<option
													selected={formData && formData.role === "Cashier"}
													value="Cashier">
													Cashier
												</option>
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
											{mode === "CREATE" ? "SUBMIT" : "UPDATE"}
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</form>
				</Paper>
			</Container>
		</div>
	);
};

export default UserForm;
