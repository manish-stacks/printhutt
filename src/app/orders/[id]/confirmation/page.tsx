import { notFound } from 'next/navigation';
import Link from 'next/link';
import Order from '@/models/orderModel';
import { BiCheckCircle } from 'react-icons/bi';
import { formatCurrency } from '@/helpers/helpers';

export default async function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const order = await Order.findById(id).lean();
  if (!order) {
    notFound();
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

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <p><span className="font-medium">Order ID:</span> {order.orderId}</p>
              <p><span className="font-medium">Total Amount:</span> {formatCurrency(order.totalAmount)}</p>
              <p><span className="font-medium">Status:</span> {order.status}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatCurrency(item.price)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Shipping Details</h3>
              <div className="text-gray-600">
                <p>{order.shipping.addressLine}</p>
                <p>{order.shipping.city}, {order.shipping.state} {order.shipping.postCode}</p>
                <p>Phone: {order.shipping.mobileNumber}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center space-x-4">
            <button className='btn bg-blue-600 text-white px-5 py-3 rounded'>
              <Link href="/user/orders">View All Orders</Link>
            </button>
            <button className='btn bg-gray-600 text-white px-5 py-3 rounded'>
              <Link href="/">Continue Shopping</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}