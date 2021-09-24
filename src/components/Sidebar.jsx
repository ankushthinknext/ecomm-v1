import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";
const useStyles = makeStyles({
	sidebar: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		color: "#ffffff",
		"& a": {
			color: "white",
		},
	},
	sidebarLink: {
		height: "80px",
		width: "90px",

		margin: "10px 0",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",

		"& h5": {
			margin: "5px 0",
			fontSize: "11px",
		},

		"&:hover": {
			background: "#EA5179",
			color: "#ffffff",
			borderRadius: "10px",
		},
		"&.active": {
			background: "#EA5179",
			color: "#ffffff",
			borderRadius: "10px",
		},
	},
});

function Sidebar() {
	let CURRENT_URL = useLocation().pathname;
	const classes = useStyles();
	const isLinkActive = (link) => {
		return link.split("/")[1] === CURRENT_URL.split("/")[2];
	};

	const linksArray = [
		{
			id: 1,
			label: "Dashboard",
			classes: "sidebar-links",
			icon: <HomeIcon />,
			path: "/main",
		},
		{
			id: 2,
			label: "Users",
			classes: "sidebar-links",
			icon: <PeopleAltIcon />,
			path: "/users",
		},
		{
			id: 3,
			label: "Category",
			classes: "sidebar-links",
			icon: <PeopleAltIcon />,
			path: "/categories",
		},
		{
			id: 4,
			label: "Products",
			classes: "sidebar-links",
			icon: <PeopleAltIcon />,
			path: "/products",
		},
		{
			id: 5,
			label: "Transactions",
			classes: "sidebar-links",
			icon: <PeopleAltIcon />,
			path: "/transactions",
		},
		{
			id: 6,
			label: "Reports",
			classes: "sidebar-links",
			icon: <PeopleAltIcon />,
			path: "/reports",
		},
	];
	return (
		<div className={classes.sidebar}>
			{linksArray.map((link) => (
				<Link to={`/dashboard${link.path}`} key={link.id}>
					<div
						className={`${classes.sidebarLink} ${
							isLinkActive(link.path) ? "active" : ""
						}`}>
						{link.icon}
						<h5>{link.label}</h5>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Sidebar;
