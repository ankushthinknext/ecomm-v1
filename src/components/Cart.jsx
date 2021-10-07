import {
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	TableContainer,
	Button,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../App";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import axios from "../config/axiosConfig";
import { SubTitle } from "chart.js";
import Receipt from "./Receipt";

function Cart() {
	const [storeSettings, setStoreSettings] = useState(null);
	const [open, setOpen] = React.useState(true);
	const [transactionData, setTransactionData] = useState(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const { cartItems, increment, addToCart, decrement } =
		useContext(CartContext);

	useEffect(() => {
		axios("setting").then((response) => setStoreSettings(response.data.data));
	}, []);

	const subTotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.qty,
		0,
	);

	const discount = storeSettings
		? subTotal * (storeSettings.discount / 100)
		: 0;
	const tax = storeSettings
		? ((subTotal - discount) * storeSettings.tax) / 100
		: 0;

	const grandTotal = storeSettings ? subTotal + tax - discount : 0;

	const handleTransaction = () => {
		axios
			.post("transaction", {
				items: cartItems,
				discount,
				grandtotal: grandTotal,
				subtotal: subTotal,
			})
			.then((response) => {
				setTransactionData(response.data.data);
				response.status === 200 && handleClickOpen();
			});
	};

	return (
		<div>
			<TableContainer>
				{cartItems ? (
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Product</TableCell>
									<TableCell>Quantity</TableCell>
									<TableCell>Price</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cartItems.map((item) => (
									<TableRow key={item._id}>
										<TableCell>
											{item.name} {item.price}
										</TableCell>
										<TableCell align="center">
											<RemoveCircleOutlineIcon
												onClick={() => decrement(item._id)}
												color="secondary"
											/>
											{item.qty}

											<AddCircleOutlineIcon
												onClick={() => increment(item._id)}
												color="secondary"
											/>
										</TableCell>
										<TableCell>{(item.qty * item.price).toFixed(2)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<Table style={{ marginTop: "20px" }}>
							<TableHead>
								<TableRow>
									<TableCell>Sub Total</TableCell>
									<TableCell align="right">{subTotal.toFixed(2)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Discount</TableCell>
									<TableCell align="right">{discount.toFixed(2)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Tax</TableCell>
									<TableCell align="right">{tax.toFixed(2)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Grand Total</TableCell>
									<TableCell align="right">{grandTotal.toFixed(2)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<Button variant="default">Cancel</Button>
									</TableCell>
									<TableCell align="right">
										<Button
											onClick={handleTransaction}
											disabled={cartItems?.length === 0 ? true : false}
											size="large"
											className="m-btn m-btn-lg m-btn-rounded"
											color="secondary"
											variant="contained">
											Pay
										</Button>
									</TableCell>
								</TableRow>
							</TableHead>
						</Table>
					</TableContainer>
				) : (
					<h2>Loading...</h2>
				)}
			</TableContainer>
			<Receipt
				receiptModal={open}
				receiptData={transactionData}
				onOpen={handleClickOpen}
				onClose={handleClose}
			/>
		</div>
	);
}

export default Cart;
