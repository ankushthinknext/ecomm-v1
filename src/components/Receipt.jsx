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
								{receiptData.items.map((item) => (
									<TableRow key={item._id}>
										<TableCell>
											{item.name} {item.price}
										</TableCell>
										<TableCell align="center">{item.qty}</TableCell>
										<TableCell align="center">{item.price}</TableCell>
										<TableCell>{(item.qty * item.price).toFixed(2)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Disagree</Button>
					<Button onClick={onClose} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
