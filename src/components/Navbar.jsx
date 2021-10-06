import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { Button, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../App";

const useStyles = makeStyles({
	navbar: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		background: "#ffffff",
		padding: "5px 20px",
	},
});
function Navbar() {
	const { cartItems } = useContext(CartContext);
	const classes = useStyles();
	return (
		<div className={classes.navbar}>
			<Button>
				<Badge
					badgeContent={cartItems.reduce(
						(acc, current) => acc + current.qty,
						0,
					)}
					color="primary">
					<ShoppingCartIcon color="action" />
				</Badge>
			</Button>
			<Button>
				<Avatar>AN</Avatar>
			</Button>
		</div>
	);
}

export default Navbar;
