"use client";
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BsCheckCircle, BsClock, BsTruck, BsXCircle } from 'react-icons/bs';
import { BiCheckCircle, BiMapPin, BiPackage, BiPhone, BiXCircle } from 'react-icons/bi';
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
import { RiArrowLeftFill, RiArrowRightFill } from 'react-icons/ri';

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
            setOrder(response.data);
            setOrderStatus(response.data.status);
        } catch (error) {
            console.log(error.message);
            toast.error('Error fetching order:');
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    if (!order) {
        return <LoadingSpinner />;
    }

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
        <div className="min-h-screen bg-gray-200 mt-10">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold">Order #{order?.orderId}</h1>
                            <div className={statusConfig[orderStatus as keyof typeof statusConfig].color}>
                                {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {order?.prevOrderId && (
                                <Link
                                    href={`/admin/orders/orders-details/${order?.prevOrderId}`}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                                >
                                    <RiArrowLeftFill /> <span>Previous</span>
                                </Link>
                            )}
                            {order?.nextOrderId && (
                                <Link
                                    href={`/admin/orders/orders-details/${order?.nextOrderId}`}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                                >
                                    <span>Next</span> <RiArrowRightFill />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-3 gap-6">
                    {/* Left Column - Order Items */}
                    <div className="col-span-2 space-y-6">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-6">Order Items</h2>
                                <div className="divide-y divide-gray-200">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="py-4">
                                            <div className="flex space-x-4">
                                                <Image
                                                    alt={item.name}
                                                    src={
                                                        item.product_image ||
                                                        'https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664958/elementor-placeholder-image_wps86z_qulbgy.webp'
                                                    }
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md object-cover"
                                                />
                                                <div className="flex-1">
                                                    <Link
                                                        href={`/product-details/${item.slug}`}
                                                        className="text-lg font-medium hover:text-blue-600"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                                                        <span>Qty: {item.quantity}</span>
                                                        <span>SKU: {item.sku}</span>
                                                        <span className="font-medium text-gray-900">
                                                            {formatCurrency(item.price)}
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                            {item?.custom_data && (
                                                <div className="mt-2">
                                                    <CustomizeOderModel item={item?.custom_data} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Status Update */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
                            <Select
                                value={statusOptions.find((option) => option.value === orderStatus)}
                                onChange={handleStatusChange}
                                options={statusOptions}
                                className="w-full"
                            />
                            {showShipmentForm && (
                                <div className="mt-4 border-t pt-4">
                                    <h3 className="text-lg font-medium mb-4">Shipment Details</h3>
                                    <form onSubmit={handleShipmentSubmit} className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Length (cm)</label>
                                            <input
                                                type="number"
                                                value={shipmentDetails.length}
                                                onChange={(e) =>
                                                    setShipmentDetails((prev) => ({
                                                        ...prev,
                                                        length: e.target.value,
                                                    }))
                                                }
                                                className="w-full rounded-md border p-2"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Width (cm)</label>
                                            <input
                                                type="number"
                                                value={shipmentDetails.width}
                                                onChange={(e) =>
                                                    setShipmentDetails((prev) => ({
                                                        ...prev,
                                                        width: e.target.value,
                                                    }))
                                                }
                                                className="w-full rounded-md border p-2"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Height (cm)</label>
                                            <input
                                                type="number"
                                                value={shipmentDetails.height}
                                                onChange={(e) =>
                                                    setShipmentDetails((prev) => ({
                                                        ...prev,
                                                        height: e.target.value,
                                                    }))
                                                }
                                                className="w-full rounded-md border p-2"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Weight (kg)</label>
                                            <input
                                                type="number"
                                                value={shipmentDetails.weight}
                                                onChange={(e) =>
                                                    setShipmentDetails((prev) => ({
                                                        ...prev,
                                                        weight: e.target.value,
                                                    }))
                                                }
                                                className="w-full rounded-md border p-2"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="col-span-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                        >
                                            {loading ? 'Creating Shipment...' : 'Create Shipment'}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Details */}
                    <div className="space-y-6">
                        {/* Payment Summary Card */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(order.totalAmount.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>
                                        {order.totalAmount.shippingTotal > 0
                                            ? formatCurrency(order.totalAmount.shippingTotal)
                                            : 'Free'}
                                    </span>
                                </div>
                                {order.coupon.isApplied && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Discount {order.coupon.code}</span>
                                        <span>- {formatCurrency(order.totalAmount.coupon_discount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Extra Discount</span>
                                    <span>
                                        -{' '}
                                        {formatCurrency(
                                            order.totalAmount.totalPrice +
                                            order.totalAmount.shippingTotal -
                                            (order.totalAmount.discountPrice + order.totalAmount.shippingTotal)
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-900 font-semibold">
                                    <span>Total Amount</span>
                                    <span>
                                        {formatCurrency(
                                            order.totalAmount.discountPrice +
                                            order.totalAmount.shippingTotal -
                                            order.totalAmount.coupon_discount
                                        )}
                                    </span>
                                </div>
                                {order.paymentType === 'offline' && (
                                    <>
                                        <div className="flex justify-between text-green-500">
                                            <span>Pay Amount</span>
                                            <span>- {formatCurrency(order.payAmt)}</span>
                                        </div>
                                        <div className="flex justify-between text-rose-600">
                                            <span>Due Amount</span>
                                            <span>
                                                {formatCurrency(
                                                    order.totalAmount.discountPrice +
                                                    order.totalAmount.shippingTotal -
                                                    order.totalAmount.coupon_discount -
                                                    order.payAmt
                                                )}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Customer Details Card */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <BiMapPin className="h-5 w-5 text-gray-400 mt-1" />
                                    <div>
                                        <p className="font-medium">{order.shipping.userName || 'Guest'}</p>
                                        <p className="text-gray-600">{order.shipping.addressLine}</p>
                                        <p className="text-gray-600">
                                            {order.shipping.city}, {order.shipping.state} {order.shipping.postCode}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <BiPhone className="h-5 w-5 text-gray-400" />
                                    <p className="text-gray-600">{order.shipping.mobileNumber}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Details Card */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Payment Method</span>
                                    <span className="capitalize">{order.payment.method}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
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
                                    <div className="flex justify-between text-gray-600">
                                        <span>Transaction ID</span>
                                        <span className="font-mono">{order.payment.transactionId}</span>
                                    </div>
                                )}
                                {order.payment.paidAt && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Paid At</span>
                                        <span>{formatDate(order.payment.paidAt)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-900 font-semibold">
                                    <span>Pay Amount</span>
                                    <span>{formatCurrency(order.payAmt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}