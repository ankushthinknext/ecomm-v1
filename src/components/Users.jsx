import { Container, Grid, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Users() {
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
			</Container>
		</div>
	);
}

export default Users;
