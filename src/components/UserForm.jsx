import React, { useState } from "react";
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

const UserForm = ({ history }) => {
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState(null);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	console.log(errors);

	const formSchema = {
		username: Joi.string().min(7).max(30).required().label("User Name"),
		fullname: Joi.string().min(3).max(30).required().label("Full Name"),
		password: Joi.string().min(7).max(30).required().label("Password"),
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
			axios.post("user", formData);
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
											autoComplete="Pa"
											error={
												errors &&
												errors.find((er) => er.context.key === "password")
											}
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
											Submit
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
