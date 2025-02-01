interface Item {
  name: string;
  quantity: number;
  price: number;
  discountPrice: number;
  product_image: string;
  sku: string;
}

interface Payment {
  method: string;
  isPaid: boolean;
  transactionId?: string;
  paidAt?: string;
}

interface Shipping {
  userName: string;
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
  mobileNumber: string;
  email: string;
}

interface Coupon {
  isApplied: boolean;
  code: string;
  discountAmount: number;
}

export function getCustomerEmailTemplate({
  orderId,
  items,
  totalAmount,
  payment,
  shipping,
  coupon,
  formatCurrency,
  paymentType,
  payAmt
}: {
  orderId: string;
  items: Item[];
  totalAmount: {
    discountPrice: number;
    shippingTotal: number;
    totalPrice: number;
    coupon_discount: number;
  };
  payment: Payment;
  shipping: Shipping;
  coupon: Coupon;
  formatCurrency: (amount: number) => string;
  paymentType: string;
  payAmt: number;
}) {
  const itemsHtml = items
    .map(item => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; display: flex;">
          <img src="${item.product_image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
          <div>
            <p style="margin: 0; color: #374151; font-weight: 500;">${item.name}</p>
            <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">
              Quantity: ${item.quantity} | SKU: ${item.sku}
            </p>
          </div>
          </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">
          ${formatCurrency(item.price)}
        </td>
      </tr>
    `).join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Order Confirmation</title>
      </head>
      <body style="background-color: #f3f4f6; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0"  style="margin: auto;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table width="100%" cellpadding="0"  style="background-color: #ffffff; max-width: 600px; margin: auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="padding: 40px 40px 32px; text-align: center; background-color: #000000; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Order Confirmation</h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 32px 40px;">
                    <table width="100%" cellpadding="0"  style="margin-bottom: 32px;">
                      <tr>
                        <td style="padding: 16px; background-color: #f9fafb; border-radius: 6px;">
                          <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Order ID</p>
                          <p style="margin: 0; color: #111827; font-weight: 500;">${orderId}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Payment Details -->
                    <div style="margin-bottom: 24px; padding: 16px; background-color: #f9fafb; border-radius: 6px;">
                      <h3 style="margin: 0 0 12px; color: #111827; font-size: 16px; font-weight: 600;">Payment Information</h3>
                      <p style="margin: 0; color: #374151;">
                        Method: ${payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}<br>
                        Status: ${payment.isPaid ? 'Paid' : 'Pending'}<br>
                        ${payment.transactionId ? `Transaction ID: ${payment.transactionId}<br>` : ''}
                        ${payment.paidAt ? `Payment Date: ${new Date(payment.paidAt).toLocaleDateString()}<br>` : ''}
                      </p>
                    </div>

                    <!-- Shipping Details -->
                    <div style="margin-bottom: 24px; padding: 16px; background-color: #f9fafb; border-radius: 6px;">
                      <h3 style="margin: 0 0 12px; color: #111827; font-size: 16px; font-weight: 600;">Shipping Details</h3>
                      <p style="margin: 0; color: #374151;">
                        ${shipping.userName}<br>
                        ${shipping.addressLine}<br>
                        ${shipping.city}, ${shipping.state} ${shipping.postCode}<br>
                        Phone: ${shipping.mobileNumber}<br>
                        Email: ${shipping.email}
                      </p>
                    </div>

                    <!-- Order Items -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                      <tr>
                        <td colspan="2" style="padding-bottom: 16px;">
                          <h2 style="margin: 0; color: #111827; font-size: 18px; font-weight: 600;">Order Summary</h2>
                        </td>
                      </tr>
                      ${itemsHtml}
                      <tr>
                        <td colspan="2" style="padding-top: 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            
                              <tr>
                                <td style="padding: 8px 0; color: #374151;">Subtotal</td>
                                <td style="padding: 8px 0; text-align: right; color: #374151;">
                                  ${formatCurrency(totalAmount.totalPrice)}
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 0; color: #374151;">Shipping Charges</td>
                                <td style="padding: 8px 0; text-align: right; color: #374151;">
                                  ${totalAmount.shippingTotal > 0 ? formatCurrency(totalAmount.shippingTotal) : 'Free'}
                                </td>
                              </tr>
                              ${coupon.isApplied ? `
                              <tr>
                                <td style="padding: 8px 0; color: #374151;">Discount (${coupon.code})</td>
                                <td style="padding: 8px 0; text-align: right; color: #22c55e;">
                                  -${formatCurrency(totalAmount.coupon_discount)}
                                </td>
                              </tr>
                            ` : ''}
                            <tr>
                                <td style="padding: 8px 0; color: #374151;">Extra Discount</td>
                                <td style="padding: 8px 0; text-align: right; color: #22c55e;">
                                  -${formatCurrency((totalAmount.totalPrice + totalAmount.shippingTotal) - (totalAmount.discountPrice + totalAmount.shippingTotal))} </td>
                              </tr>
                            <tr>
                              <td style="padding: 8px 0; color: #111827; font-weight: 600;">Total Amount</td>
                              <td style="padding: 8px 0; text-align: right; color: #111827; font-weight: 600;">
                                ${formatCurrency((totalAmount.discountPrice + totalAmount.shippingTotal) - totalAmount.coupon_discount)}
                              </td>
                            </tr>
                            ${paymentType === 'offline' ? `
                              <tr>
                                <td style="padding: 8px 0; color: #111827; font-weight: 600;">Due Amount</td>
                                <td style="padding: 8px 0; text-align: right; color: #111827; font-weight: 600;">
                                  ${formatCurrency((totalAmount.discountPrice + totalAmount.shippingTotal - totalAmount.coupon_discount) - payAmt)}
                                </td>
                              </tr>
                          ` : ''}                          
                          </table>
                        </td>
                      </tr>
                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 32px 0;">
                          <a href="${process.env.APP_URL}/orders/${orderId}" 
                             style="display: inline-block; padding: 12px 24px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; text-align: center;">
                            View Order Details
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 32px 0 0; padding-top: 32px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; text-align: center;">
                      Thank you for shopping with us! If you have any questions, please contact our support team.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}