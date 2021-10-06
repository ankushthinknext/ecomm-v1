import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Dashboard from "./screens/Dashboard";
import Sidebar from "./components/Sidebar";
import { Route } from "react-router";

export const CartContext = React.createContext();
function App() {
	const [cartItems, setCartItems] = useState([]);
	const addToCart = (item) => {
		let index = cartItems.findIndex((x) => x._id === item._id);
		if (index === -1) {
			item = { ...item, qty: 1 };
			setCartItems([...cartItems, item]);
		} else {
			let cloneItems = [...cartItems];
			cloneItems.splice(index, 1);
			setCartItems(cloneItems);
		}
	};
	const increment = (id) => {
		let cloneItems = [...cartItems];
		let index = cartItems.findIndex((x) => x._id === id);
		cloneItems[index].qty++;
		setCartItems(cloneItems);
	};
	const decrement = (id) => {
		let cloneItems = [...cartItems];
		let index = cartItems.findIndex((x) => x._id === id);
		if (cloneItems[index].qty === 1) {
			cloneItems.splice(index, 1);
		} else {
			cloneItems[index].qty--;
		}
		setCartItems(cloneItems);
	};

	return (
		<CartContext.Provider
			value={{ cartItems, increment, addToCart, decrement }}>
			<div>
				<Route path="/dashboard" component={Dashboard} />
			</div>
		</CartContext.Provider>
	);
}

export default App;
