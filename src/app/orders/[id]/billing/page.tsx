"use client";
import { notFound, useParams } from 'next/navigation';
import { formatCurrency, formatDate } from '@/helpers/helpers';
import { useEffect, useState } from 'react';
import { IOrder } from '@/lib/types/order';
import { get_order_details } from '@/_services/common/order';
import { usePDF } from 'react-to-pdf';

export default function OrderDetailsPage() {
    const params = useParams();
    // const router = useRouter();
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const { toPDF, targetRef } = usePDF({ filename: 'invoice.pdf' });

    const fetchOrder = async () => {
        try {
            const orderData = await get_order_details(params.id);
            setOrder(orderData);
        } catch (error) {
            console.error("Error fetching order details:", error);
            notFound();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params?.id) {
            fetchOrder();
        }
    }, [params]);

    const handlePrint = () => {
        window.print();
    };

    // const handleDownload = () => {
    // const doc = new jsPDF();
    // doc.text("Invoice", 10, 10);
    // doc.save(`invoice_${order.orderId}.pdf`);
    // };
    // 

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return notFound();
    }

    const paymentStatus = order.payment.isPaid ? 'Paid' : 'Unpaid';

    return (
        <div id="invoice" className="bg-white p-10 border max-w-screen-md mx-auto shadow-lg my-6 relative" ref={targetRef}>
            <div className="flex space-x-4 mb-4">
                <button onClick={handlePrint} className="px-4 py-2 bg-blue-500 text-white rounded">Print</button>
                <button onClick={() => toPDF()} className="px-4 py-2 bg-green-500 text-white rounded">Download</button>
            </div>
            {
                order.paymentType === 'offline' ? (
                    <span className="absolute top-9 right-0 bg-red-100 text-red-800 text-sm font-medium py-0.5 rounded dark:bg-green-900 dark:text-green-300 rotate-45 w-[110px] text-center">Post-Paid</span>
                ) : (
                    <span className="absolute top-9 right-0 bg-green-100 text-green-800 text-sm font-medium py-0.5 rounded dark:bg-green-900 dark:text-green-300 rotate-45 w-[110px] text-center">Pre-Paid</span>
                )}

            <div className="border-b pb-6 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold uppercase">Invoice</h1>
                        <p className="text-sm text-gray-500">Invoice No: #{order.orderId}</p>
                        <p className={`text-sm ${order.payment.isPaid ? 'text-green-600' : 'text-red-600'}`}>Status: {paymentStatus}</p>
                    </div>
                    <div>
                        <p className="text-sm">Date: {formatDate(order.createdAt)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <h2 className="text-lg font-semibold">Billed To:</h2>
                    <p>{order.shipping.userName || 'Guest'}</p>
                    <p>{order.shipping.addressLine}</p>
                    <p>{order.shipping.city}, {order.shipping.state} {order.shipping.postCode}</p>
                    <p>{order.shipping.mobileNumber}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Shipped To:</h2>
                    <p>{order.shipping.userName || 'Guest'}</p>
                    <p>{order.shipping.addressLine}</p>
                    <p>{order.shipping.city}, {order.shipping.state} {order.shipping.postCode}</p>
                    <p>{order.shipping.mobileNumber}</p>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                <table className="w-full border-collapse border text-sm">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2 text-left">#</th>
                            <th className="border p-2 text-left">Item Name</th>
                            <th className="border p-2 text-right">Quantity</th>
                            <th className="border p-2 text-right">Price</th>
                            <th className="border p-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{item.name}</td>
                                <td className="border p-2 text-right">{item.quantity}</td>
                                <td className="border p-2 text-right">{formatCurrency(item.price)}</td>
                                <td className="border p-2 text-right">
                                    {formatCurrency(item.price * item.quantity)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                <div className="flex justify-between items-center mb-2">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(order.totalAmount.totalPrice)}</span>
                </div>

                <div className="flex justify-between items-center mb-2">
                    <span>Shipping:</span>
                    <span>{order.totalAmount.shippingTotal > 0 ? formatCurrency(order.totalAmount.shippingTotal) : 'Free'}</span>
                </div>

                {
                    order.coupon.isApplied && (
                        <div className="flex justify-between items-center mb-2">
                            <span>Discount {order.coupon.code}:</span>
                            <span>- {formatCurrency(order.totalAmount.coupon_discount)}</span>
                        </div>
                    )
                }
                <div className="flex justify-between items-center mb-2">
                    <span>Extra Discount:</span>
                    <span>- {formatCurrency((order.totalAmount.totalPrice + order.totalAmount.shippingTotal) - (order.totalAmount.discountPrice + order.totalAmount.shippingTotal))}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2 font-semibold">
                    <span>Total Amount:</span>
                    <span>{formatCurrency((order.totalAmount.discountPrice + order.totalAmount.shippingTotal) - order.totalAmount.coupon_discount)}</span>
                </div>
                {order.paymentType === 'offline' && (
                    <>
                        <div className="flex justify-between items-center">
                            <span>Pay Amount:</span>
                            <span className='text-green-500'>-{formatCurrency(order.payAmt)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Due Amount:</span>
                            <span className='text-rose-600'>{formatCurrency((order.totalAmount.discountPrice + order.totalAmount.shippingTotal - order.totalAmount.coupon_discount) - order.payAmt)}</span>
                        </div>
                    </>
                )}
            </div>

            <div className="text-center text-xs text-gray-500 border-t pt-4">
                <p>Thank you for your business!</p>
                <p>Invoice generated on {formatDate(new Date())}.</p>
            </div>
        </div>
    );
}