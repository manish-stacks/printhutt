import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { formatCurrency } from '@/helpers/helpers';
import User from '@/models/userModel';
import Order from '@/models/orderModel';
import Product from '@/models/productModel';
import Coupon from '@/models/couponModel';
import Blog from '@/models/blogModel';
import SessionCart from '@/models/session_carts.model';

export async function GET() {
  try {
    await dbConnect();
    const last30DaysRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
          status: { $in: ["confirmed", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            dayOfWeek: { $dayOfWeek: "$createdAt" },
          },
          totalRevenue: { $sum: "$payAmt" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.date": 1 },
      },
    ]);
    
    const daysMap = {
      1: "Sunday",
      2: "Monday",
      3: "Tuesday",
      4: "Wednesday",
      5: "Thursday",
      6: "Friday",
      7: "Saturday",
    };
    
    const weeklyRevenue = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      values: [0, 0, 0, 0, 0, 0, 0],
    };
    
    last30DaysRevenue.forEach(({ _id, totalRevenue }) => {
      const dayName = daysMap[_id.dayOfWeek]; 
      const index = weeklyRevenue.labels.indexOf(dayName); 
      if (index !== -1) {
        weeklyRevenue.values[index] += totalRevenue;
      }
    });
    
    const orderCount = last30DaysRevenue.reduce((total, order) => total + order.orderCount, 0);
    const totalRevenue = last30DaysRevenue.reduce((total, order) => total + order.totalRevenue, 0);
    


    const totalUser = await User.find().countDocuments();
    const totalProduct = await Product.find({ isCustomize: false }).countDocuments();
    const totalProductCustom = await Product.find({ isCustomize: true }).countDocuments();
    const totalBlog = await Blog.find().countDocuments();
    const totalCoupon = await Coupon.find().countDocuments();
    const totalCart = await SessionCart.countDocuments();

    const stats = [
      { title: 'Total Users', value: totalUser, trend: 12, Icon: 'ri ri-user-3-line', color: 'bg-blue-500' },
      { title: 'Revenue', value: formatCurrency(totalRevenue), trend: 8, Icon: 'ri ri-money-dollar-circle-line', color: 'bg-green-500' },
      { title: 'Orders', value: orderCount, trend: -3, Icon: 'ri ri-shopping-cart-2-line', color: 'bg-purple-500' },
      { title: 'Cart', value: totalCart, trend: 15, Icon: 'ri ri-bar-chart-line', color: 'bg-orange-500' },
      { title: 'Pre Products', value: totalProduct, trend: 5, Icon: 'ri ri-shopping-bag-3-line', color: 'bg-red-500' },
      { title: 'Customized Products', value: totalProductCustom, trend: 10, Icon: 'ri ri-shopping-bag-3-line', color: 'bg-yellow-500' },
      { title: 'Blog Posts', value: totalBlog, trend: 7, Icon: 'ri ri-newspaper-line', color: 'bg-indigo-500' },
      { title: 'Coupons', value: totalCoupon, trend: 7, Icon: 'ri ri-gift-fill', color: 'bg-indigo-500' },
    ];




    const sessionData = await SessionCart.find().sort({ createdAt: -1 }).limit(6).populate("productId");

    return NextResponse.json({ success: true, stats, weeklyRevenue, sessionData }, { status: 200 });

  } catch (error: unknown) {
    console.error("Error in GET /api/dashboard:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
