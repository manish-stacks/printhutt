"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";
// import { formatCurrency } from "@/helpers/helpers";
import { useEffect, useState } from "react";
import { get_order_details } from "@/_services/common/order";
import { IOrder } from "@/lib/types/order";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/useCartStore";
import confetti from "canvas-confetti";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function OrderConfirmationPage() {
  const params = useParams();
  // const router = useRouter();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const { removeAllItems } = useCartStore();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await get_order_details(params.id);
        setOrder(orderData.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        notFound()
      } finally {
        setLoading(false);
      }
    };

    const showConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    if (params?.id) {
      toast.success('Order placed successfully');
      removeAllItems();
      fetchOrder();
      showConfetti();
    }
  }, [params]);

  if (loading) {
    return (
      <LoadingSpinner/>
    );
  }

  if (!order) {
    return notFound();;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <BiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
            <p className="text-gray-600 mt-2">
              Thank you for your purchase. Your order has been received.
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
