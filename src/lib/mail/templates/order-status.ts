import { formatCurrency } from "@/helpers/helpers";
import { OrderDetails } from "@/lib/types";

export function generateOrderStatusEmail(order: OrderDetails): string {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Order Status Update</title>
			<style>
				body { font-family: Arial, sans-serif; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background-color: #f8f8f8; padding: 10px; text-align: center; }
				.order-details { margin-top: 20px; }
				.order-details th, .order-details td { padding: 10px; text-align: left; }
				.footer { margin-top: 20px; text-align: center; font-size: 12px; color: #888; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>Order Status Update</h1>
				</div>
				<p>Dear ${order.shipping.userName},</p>
				<p>Your order with ID <strong>${order.orderId}</strong> is currently <strong>${order.status}</strong>.</p>
				<div class="order-details">
					<h2>Order Details</h2>
					<table>
						<tr>
							<th>Item</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
						${order.items.map(item => `
							<tr>
								<td>${item.name}</td>
								<td>${item.quantity}</td>
								<td>₹${(item.discountType === 'percentage' ? (
			item.price - (item.price * item.discountPrice) / 100
		) : item.price - item.discountPrice) * item.quantity}</td>
							</tr>
						`).join('')}
					</table>
					<p><strong>Total: ₹${formatCurrency(order.totalAmount.discountPrice)}</strong></p>
				</div>
				<div class="footer">
					<p>Thank you for shopping with us!</p>
					<p>If you have any questions, please contact our support team.</p>
				</div>
			</div>
		</body>
		</html>
	`;
}

export function getShippedEmailTemplate(order: OrderDetails): string {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Order Shipped</title>
			<style>
				body { font-family: Arial, sans-serif; }
				.container { max-width: 600px; margin: 0 auto; padding: 20px; }
				.header { background-color: #f8f8f8; padding: 10px; text-align: center; }
				.order-details { margin-top: 20px; }
				.order-details th, .order-details td { padding: 10px; text-align: left; }
				.footer { margin-top: 20px; text-align: center; font-size: 12px; color: #888; }
			</style>
		</head>
		<body>
			<div class="container">
				<div class="header">
					<h1>Your Order Has Shipped!</h1>
				</div>
				<p>Dear ${order.shipping.userName},</p>
				<p>Your order with ID <strong>${order.orderId}</strong> has been shipped.</p>
				<p>Tracking ID: <strong>${order.shipment.trackingId}</strong></p>
				<div class="order-details">
					<h2>Order Details</h2>
					<table>
						<tr>
							<th>Item</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
						${order.items.map(item => `
							<tr>
								<td>${item.name}</td>
								<td>${item.quantity}</td>
								<td>₹${(item.discountType === 'percentage' ? (
			item.price - (item.price * item.discountPrice) / 100
		) : item.price - item.discountPrice) * item.quantity}</td>
							</tr>
						`).join('')}
					</table>
					<p><strong>Total: ₹${formatCurrency(order.totalAmount.discountPrice)}</strong></p>
				</div>
				<div class="footer">
					<p>Thank you for shopping with us!</p>
					<p>If you have any questions, please contact our support team.</p>
				</div>
			</div>
		</body>
		</html>
	`;
}
