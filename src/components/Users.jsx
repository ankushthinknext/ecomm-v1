import {
	Container,
	Grid,
	Button,
	Paper,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	TableContainer,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../config/axiosConfig";
import moment from "moment";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

function Users() {
	const [users, setUsers] = useState(null);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		axios("user?limit=100").then((response) =>
			setUsers(response.data.data.users),
		);
	}, [refresh]);
	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ea5179",
			cancelButtonColor: "grey",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axios.delete(`user/${id}`).then((response) => {
					if (response.status === 200) {
						Swal.fire("Deleted!", "User deleted!", "success");
						setRefresh(!refresh);
					} else {
						Swal.fire("Opps!", "Something went wrong", "error");
					}
				});
			}
		});
	};

	return (
		<div>
			<Container>
				<Grid container style={{ margin: "10px 0" }} justifyContent="flex-end">
					<Grid items>
						<Link to="/dashboard/users/new">
							<Button className="m-btn" variant="contained">
								New User
							</Button>
						</Link>
					</Grid>
				</Grid>
				<Paper>
					<Grid container>
						<Grid items xs={12}>
							<Grid container>
								<Grid items xs={12}>
									<TableContainer
										style={{ height: "80vh", overflowY: "scroll" }}>
										{users ? (
											<Table>
												<TableHead>
													<TableRow>
														<TableCell>Full Name</TableCell>
														<TableCell>Username</TableCell>
														<TableCell>Role</TableCell>
														<TableCell>Last Active</TableCell>
														<TableCell></TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{users.map((user) => (
														<TableRow>
															<TableCell>{user.fullname}</TableCell>
															<TableCell>{user.username}</TableCell>
															<TableCell>{user.role}</TableCell>
															<TableCell>
																{moment(user.lastActive).format("llll")}
															</TableCell>
															<TableCell>
																<Button>
																	<ModeEditIcon />
																</Button>
																<Button>
																	<DeleteIcon
																		onClick={() => handleDelete(user._id)}
																	/>
																</Button>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										) : (
											<h2>Loading...</h2>
										)}
									</TableContainer>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</div>
	);
}

export default Users;
