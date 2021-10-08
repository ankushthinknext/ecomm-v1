import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
	Typography,
	Table,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	Button,
} from "@mui/material";
import moment from "moment";
import { ReceiptTwoTone } from "@mui/icons-material";

export default function Receipt({
	receiptModal,
	onOpen,
	onClose,
	receiptData,
}) {
	return (
		<div>
			<Dialog
				style={{ padding: "20px" }}
				open={receiptModal}
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					<Typography variant="h4" gutterBottom align="center">
						RECEIPT
					</Typography>
					<Typography
						variant="caption"
						gutterBottom
						display="block"
						align="center">
						{moment(receiptData?.updatedAt).format("llll")}
					</Typography>
					<Typography
						variant="caption"
						gutterBottom
						display="block"
						align="center">
						{receiptData?._id}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Product</TableCell>
									<TableCell>Quantity</TableCell>
									<TableCell>Unit Price</TableCell>
									<TableCell>Total</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{receiptData?.products.map((item) => (
									<TableRow key={item?._id}>
										<TableCell>{item?.name}</TableCell>
										<TableCell align="center">{item.qty}</TableCell>
										<TableCell align="center">{item.price}</TableCell>
										<TableCell>{(item.qty * item.price).toFixed(2)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<Table>
							<TableRow>
								<TableCell align="right">Subtotal</TableCell>
								<TableCell align="right">
									{receiptData?.subtotal.toFixed(2)}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="right">Discount</TableCell>
								<TableCell align="right">
									{receiptData?.discount.toFixed(2)}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="right">Grand Total</TableCell>
								<TableCell align="right">
									{receiptData?.grandtotal.toFixed(2)}
								</TableCell>
							</TableRow>
						</Table>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						fullWidth
						color="primary"
						className="m-btn"
						variant="contained">
						Print
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
