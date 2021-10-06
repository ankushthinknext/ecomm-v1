import {
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	TableContainer,
	Button,
} from "@mui/material";
import React, { useContext } from "react";
import { CartContext } from "../App";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function Cart() {
	const { cartItems, increment, addToCart, decrement } =
		useContext(CartContext);

	return (
		<div>
			<TableContainer>
				{cartItems ? (
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
				) : (
					<h2>Loading...</h2>
				)}
			</TableContainer>
		</div>
	);
}

export default Cart;
