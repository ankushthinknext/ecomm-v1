import React from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	navbar: {
		display: "flex",
		justifyContent: "flex-end",
		background: "#ffffff",
		padding: "5px 20px",
	},
});
function Navbar() {
	const classes = useStyles();
	return (
		<div className={classes.navbar}>
			<Button>
				<Avatar>AN</Avatar>
			</Button>
		</div>
	);
}

export default Navbar;
