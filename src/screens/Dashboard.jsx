import React from "react";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import Products from "../components/Products";
import Transactions from "../components/Transactions";
import Categories from "../components/Categories";
import Reports from "../components/Reports";
import { Route } from "react-router-dom";
import "./dashboard.css";
import UserForm from "../components/UserForm";

export default function Dashboard() {
	return (
		<div className="m-dashboard">
			<div className="m-sidebar-wrapper">
				<Sidebar />
			</div>
			<div className="m-main-wrapper">
				<Navbar />
				<Route path="/dashboard/main" component={Main} />
				<Route path="/dashboard/users" exact component={Users} />
				<Route path="/dashboard/users/new" exact component={UserForm} />
				<Route path="/dashboard/users/update/:id?" exact component={UserForm} />
				<Route path="/dashboard/products" component={Products} />
				<Route path="/dashboard/categories" component={Categories} />
				<Route path="/dashboard/transactions" component={Transactions} />
				<Route path="/dashboard/reports" component={Reports} />
			</div>
		</div>
	);
}
