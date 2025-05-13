"use client" 
import useCartSidebarStore from "@/store/useCartSidebarStore";
import Image from "next/image";
import Link from "next/link";

export default function PaymentFailure() {
    const { openCartSidebarView } = useCartSidebarStore();
    return (
        <>
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-8">
                            <Image
                                src="https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/error_gjjbgx_zm8hkz.gif"
                                width={180}
                                height={180}
                                alt="Check Circle"
                                className=" mx-auto mb-4"
                            />
                            <h1 className="text-3xl font-bold text-red-700">Payment Failed</h1>
                            <p className="text-gray-600 mt-2 ">
                                Unfortunately, your payment could not be processed. Please try again or contact our support team for assistance.
                            </p>
                        </div>

                        <div className="mt-12 flex justify-center space-x-4">
                            <Link
                                href="/"
                                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            >
                                Go to Home
                            </Link>
                            <button
                                onClick={openCartSidebarView}
                                type="button"
                                className="px-6 py-3 bg-gray-200 text-red-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                            >
                                Retry Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
