"use client";
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { BsCheckCircle, BsClock, BsTruck, BsXCircle } from 'react-icons/bs';
import { BiCheckCircle, BiMapPin, BiPackage, BiPhone, BiXCircle } from 'react-icons/bi';
import Order from '@/models/orderModel';
import { formatCurrency, formatDate } from '@/helpers/helpers';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { IOrder } from '@/lib/types/order';
import { get_order_by_id } from '@/_services/common/order';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';
import axios from 'axios';
import Swal from 'sweetalert2';
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
    const [showShipmentForm, setShowShipmentForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shipmentDetails, setShipmentDetails] = useState({
        length: '',
        width: '',
        height: '',
        weight: '',
    });


    const fetchOrder = async () => {
        try {
            const response = await get_order_by_id(id as string);
            setOrder(response);
            setOrderStatus(response.status);
        } catch (error) {
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

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const handleStatusChange = async (selectedOption) => {
        setOrderStatus(selectedOption.value);

        if (selectedOption.value === 'shipped') {
            setShowShipmentForm(true);
        } else if (selectedOption.value === 'cancelled') {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            });
            if (result.isConfirmed) {
                try {
                    const response = await axios.patch(`/api/order/${id}/status`, {
                        status: selectedOption.value,
                    });
                    if (response.status !== 200) {
                        throw new Error('Failed to update order status');
                    }
                    toast.success('Order status updated successfully');
                    console.log('Updated order status:', selectedOption);
                } catch (error) {
                    console.error('Error updating order status:', error);
                }
            }
        } else {
            setShowShipmentForm(false);
            try {
                const response = await axios.patch(`/api/order/${id}/status`, {
                    status: selectedOption.value,
                });
                if (response.status !== 200) {
                    throw new Error('Failed to update order status');
                }
                toast.success('Order status updated successfully');
                console.log('Updated order status:', selectedOption);
            } catch (error) {
                console.error('Error updating order status:', error);
            }
        }
    };

    const handleShipmentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post(`/api/shiprocket/create-order`, {
                orderId: id,
                shipmentDetails,
            });

            if (response.status !== 200) {
                throw new Error('Failed to create shipment');
            }
            console.log(shipmentDetails);
            toast.success('Shipment created successfully');
            setShowShipmentForm(false);
        } catch (error) {
            console.error('Error creating shipment:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-10xl mx-auto lg:px-10 py-20">
            <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
                <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
                        <p className="text-gray-600">Manage orders and shipping</p>
                    </div>
                </div>
            </div>

            <div className="bg-white px-5 py-10">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="space-y-8">
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

                        <div className="grid gap-8 md:grid-cols-2 border-t border-b border-gray-200 rounded-lg">
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
                                                                src={item.product_image || 'https://res.cloudinary.com/dkprths9f/image/upload/v1737632594/elementor-placeholder-image_wps86z.webp'}
                                                                width={60}
                                                                height={60}
                                                                className="rounded-md w-10 h-10 object-cover"
                                                            />
                                                            <Link href={`/product-details/${item.slug}`}>
                                                                {item.name}



                                                            </Link>


                                                        </p>

                                                        <p className="text-sm text-muted-foreground">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="font-medium">
                                                        <span className='text-[15px] line-through'>{item.price.toFixed(2)}</span>{" "}
                                                        {
                                                            formatCurrency((item.discountType === 'percentage' ? (
                                                                item.price - (item.price * item.discountPrice) / 100
                                                            ) : item.price - item.discountPrice) * item.quantity)
                                                        }
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
                                            <span>{formatCurrency(order.totalAmount.discountPrice - order.totalAmount.shippingTotal)}</span>
                                        </div>
                                        {
                                            <div className="flex justify-between items-center mb-2">
                                                <span>Shipping:</span>
                                                <span>{formatCurrency(order.totalAmount.shippingTotal)}</span>
                                            </div>
                                        }

                                        <div className="flex justify-between items-center mb-2">
                                            <span>Discount:</span>
                                            <span>- {formatCurrency(order.coupon.discountAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t pt-2 font-semibold">
                                            <span>Total Amount:</span>
                                            <span>{formatCurrency(order.totalAmount.discountPrice)}</span>
                                        </div>
                                        {order.paymentType === 'offline' && (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <span>Pay Amount:</span>
                                                    <span className='text-green-500'>-{formatCurrency(order.payAmt)}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span>Due Amount:</span>
                                                    <span className='text-rose-600'>{formatCurrency(order.totalAmount.discountPrice - order.payAmt)}</span>
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

                        <div className="grid gap-8 md:grid-cols-2 border-t border-b border-gray-200 rounded-lg py-10">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                                <Select
                                    value={statusOptions.find(option => option.value === orderStatus)}
                                    onChange={handleStatusChange}
                                    options={statusOptions}
                                />
                                {showShipmentForm && (
                                    <div className="border rounded-lg p-6 bg-gray-50 mt-4">
                                        <h3 className="text-lg font-semibold mb-4">Shipment Details</h3>
                                        <form onSubmit={handleShipmentSubmit} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Length (cm)</label>
                                                    <input
                                                        type="number"
                                                        value={shipmentDetails.length}
                                                        onChange={(e) => setShipmentDetails(prev => ({ ...prev, length: e.target.value }))}
                                                        className="w-full rounded-md border p-2"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Width (cm)</label>
                                                    <input
                                                        type="number"
                                                        value={shipmentDetails.width}
                                                        onChange={(e) => setShipmentDetails(prev => ({ ...prev, width: e.target.value }))}
                                                        className="w-full rounded-md border p-2"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Height (cm)</label>
                                                    <input
                                                        type="number"
                                                        value={shipmentDetails.height}
                                                        onChange={(e) => setShipmentDetails(prev => ({ ...prev, height: e.target.value }))}
                                                        className="w-full rounded-md border p-2"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Weight (kg)</label>
                                                    <input
                                                        type="number"
                                                        value={shipmentDetails.weight}
                                                        onChange={(e) => setShipmentDetails(prev => ({ ...prev, weight: e.target.value }))}
                                                        className="w-full rounded-md border p-2"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                                                {loading ? 'Creating Shipment...' : "Create Shipment"}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}