"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BsArrowLeft, BsCheckCircle, BsClock, BsTruck, BsXCircle } from 'react-icons/bs';
import { BiCheckCircle, BiMapPin, BiPackage, BiPhone, BiXCircle } from 'react-icons/bi';
import { formatCurrency, formatDate } from '@/helpers/helpers';
import { useEffect, useState } from 'react';
import { IOrder } from '@/lib/types/order';
import { get_order_by_id } from '@/_services/common/order';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';
import CustomizeOderModel from '@/components/admin/order/CustomizeOderModel';

const statusConfig = {
    pending: {
        icon: BsClock,
        color: 'px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800',
    },
    confirmed: {
        icon: BiCheckCircle,
        color: 'px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800',
    },
    shipped: {
        icon: BsTruck,
        color: 'px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800',
    },
    delivered: {
        icon: BiPackage,
        color: 'px-3 py-1 text-sm rounded-full bg-green-100 text-green-800',
    },
    cancelled: {
        icon: BiXCircle,
        color: 'px-3 py-1 text-sm rounded-full bg-red-100 text-red-800',
    },
};

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params?.id as string | undefined;
    const [order, setOrder] = useState<IOrder | null>(null);
    const [orderStatus, setOrderStatus] = useState(order?.status || 'pending');



    const fetchOrder = async () => {
        try {
            const response = await get_order_by_id(id as string);
            setOrder(response.data);
            setOrderStatus(response.data.status);
        } catch (error) {
            console.log(error)
            toast.error('Error fetching order:');
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    if (!order) {
        return <LoadingSpinner />;
    }

    const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;



    return (
        <div className="max-w-10xl mx-auto lg:px-10 py-10 ">

            <div className="px-5 py-10">
                <div className="max-w-7xl mx-auto px-4 py-4 ">
                    <div className="space-y-8">
                        <Link
                            href="/user/orders"
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                        >
                            <BsArrowLeft className="mr-2 h-4 w-4" />
                            Back to Orders
                        </Link>

                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-3xl font-bold">Order Details</h1>
                                    <StatusIcon className="h-5 w-5" />
                                    <div className={statusConfig[orderStatus as keyof typeof statusConfig].color}>
                                        {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 text-muted-foreground">
                                    <p>Order ID: {order.orderId}</p>
                                    <p>Placed on: {formatDate(order.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 border-t border-b border-gray-200 rounded-lg bg-slate-100 ">
                            <div className="space-y-8">
                                {/* Order Items */}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                                    <div className="space-y-4">
                                        {order.items.map((item, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between py-4 border-b last:border-0">
                                                    <div className="flex-1">
                                                        <p className="font-medium flex gap-2">
                                                            <Image
                                                                alt={item.name}
                                                                src={item.product_image || 'https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664958/elementor-placeholder-image_wps86z_qulbgy.webp'}
                                                                width={60}
                                                                height={60}
                                                                className="rounded-md w-10 h-10 object-cover"
                                                            />
                                                            <Link href={`/product-details/${item.slug}`}>
                                                                {item.name}
                                                            </Link>


                                                        </p>

                                                        <p className="text-sm text-muted-foreground">
                                                            Quantity: {item.quantity} | SKU: {item.sku}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">
                                                       
                                                        {formatCurrency(item.price)}
                                                    </p>
                                                </div>

                                                {item?.custom_data && (
                                                    <>
                                                        {/* <span className="text-xs text-green-700  bg-green-300 py-2 px-4" > Customized</span> */}
                                                        <CustomizeOderModel item={item?.custom_data} />
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mb-8 border-t-2 pt-4">
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
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Payment Details */}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span>Payment Method</span>
                                            <span className="capitalize">{order.payment.method}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Payment Status</span>
                                            <div className="flex items-center gap-2">
                                                {order.payment.isPaid ? (
                                                    <>
                                                        <BsCheckCircle className="h-4 w-4 text-green-500" />
                                                        <span className="text-green-500">Paid</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <BsXCircle className="h-4 w-4 text-red-500" />
                                                        <span className="text-red-500">Unpaid</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        {order.payment.transactionId && (
                                            <div className="flex justify-between items-center">
                                                <span>Transaction ID</span>
                                                <span className="font-mono">{order.payment.transactionId}</span>
                                            </div>
                                        )}
                                        {order.payment.paidAt && (
                                            <div className="flex justify-between items-center">
                                                <span>Paid At</span>
                                                <span>{formatDate(order.payment.paidAt)}</span>
                                            </div>
                                        )}
                                        <div className="pt-4 border-t">
                                            <div className="flex justify-between items-center font-semibold">
                                                <span>Pay Amount</span>
                                                <span>{formatCurrency(order.payAmt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Details */}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4 text-blue-500">Shipping Details</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <BiMapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                                            <div className="space-y-1">
                                                <p>{order.shipping.userName || 'Guest'}</p>
                                                <p>{order.shipping.addressLine}</p>
                                                <p>
                                                    {order.shipping.city}, {order.shipping.state} {order.shipping.postCode}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <BiPhone className="h-5 w-5 text-muted-foreground" />
                                            <p>{order.shipping.mobileNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}