"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";

export default function OrderConfirmation() {
    const searchParams = useSearchParams();
    const orderId = searchParams?.get("id");
    const success = searchParams?.get("success") === "true";
    const { removeAllItems } = useCartStore();
    if (!success || !orderId) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 text-center">
                    <Image
                        src="https://res.cloudinary.com/dkprths9f/image/upload/v1736248443/error_gjjbgx.gif"
                        width={180}
                        height={180}
                        alt="Check Circle"
                        className=" mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-bold text-red-700 mb-4">Invalid Order</h1>
                    <p className="text-gray-600 mb-6">
                        We couldn't find the order details. Please try again or contact support.
                    </p>
                    <Link
                        href="/"
                        className="bg-gray-600 text-white px-5 py-3 rounded"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }
    useEffect(() => {
        removeAllItems();
    }, [orderId]);
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <Image
                            src="https://res.cloudinary.com/dkprths9f/image/upload/v1736246243/check-circle_josi46.gif"
                            width={120}
                            height={120}
                            alt="Check Circle"
                            className=" mx-auto mb-4"
                        />
                        <h1 className="text-2xl font-bold text-gray-900">Order Successfully Placed!</h1>
                        <p className="text-gray-600 mt-2">
                            Thank you for your purchase. Your order has been received.
                        </p>
                        <p className="text-gray-600 mt-2">
                            Your order number is {orderId}.
                        </p>

                        <p className="text-gray-600 mt-2">
                            We'll email you an order confirmation with details and tracking info.
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center space-x-4">
                        <button className="bg-blue-600 text-white px-5 py-3 rounded">
                            <Link href="/user/orders">View All Orders</Link>
                        </button>
                        <button className="bg-gray-600 text-white px-5 py-3 rounded">
                            <Link href="/">Continue Shopping</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
