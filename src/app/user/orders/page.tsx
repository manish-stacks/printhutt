import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default async function OrdersPage() {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order: any) => (
          <Card key={order._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Order ID: {order.orderId}</p>
                <p className="text-sm text-gray-600">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
            </div>

            <div className="mt-4">
              <p className="font-medium">Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{order.totalquantity} items</p>
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href={`/orders/${order._id}`}
                className="text-primary hover:underline"
              >
                View Details
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getStatusVariant(status: string) {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
}