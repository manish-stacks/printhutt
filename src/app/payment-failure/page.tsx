"use client"

import { useRouter } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentFailure() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 px-4">
            <FaTimesCircle className="h-[100px] w-[100px] text-red-700 msy-3" />
            <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
            <p className="text-center text-lg mb-6">
                Unfortunately, your payment could not be processed. Please try again or contact our support team for assistance.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                >
                    Go to Home
                </button>
                <button
                    onClick={() => router.push("/checkout")}
                    className="px-6 py-3 bg-gray-200 text-red-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                >
                    Retry Payment
                </button>
            </div>
        </div>
    );
}
