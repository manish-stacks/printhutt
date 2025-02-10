import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { formatCurrency } from '@/helpers/helpers';
import User from '@/models/userModel';
import Order from '@/models/orderModel';
import Product from '@/models/productModel';
import Coupon from '@/models/couponModel';
import Blog from '@/models/blogModel';
import SessionCart from '@/models/session_carts.model';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();


    // const lastMonthRevenue = await Order.aggregate([
    //   {
    //     $match: {
    //       createdAt: {
    //         $gte: new Date(new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000),
    //       },
    //       status: { $in: ["confirmed", "shipped", "delivered"] }
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       totalRevenue: { $sum: "$totalAmount.totalPrice" },
    //       orderCount: { $sum: 1 }
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       totalRevenue: 1,
    //       orderCount: 1
    //     },
    //   }
    // ]);

    // const revenue = {
    //   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    //   values: [1200, 1900, 3000, 5000, 2300, 3400, 4200],
    // };


    const last30DaysRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000), // Start of 30 days ago
          },
          status: { $in: ["confirmed", "shipped", "delivered"] } // Only successful orders
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
            dayOfWeek: { $dayOfWeek: "$createdAt" } // Get day of week (1=Sunday, 2=Monday, ..., 7=Saturday)
          },
          totalRevenue: { $sum: "$totalAmount.totalPrice" }, // Sum revenue per day
          orderCount: { $sum: 1 }
        },
      },
      {
        $sort: { "_id.date": 1 } // Sort by date
      }
    ]);
    
    // Mapping MongoDB dayOfWeek numbers to actual weekday names
    const daysMap = {
      1: "Sunday",
      2: "Monday",
      3: "Tuesday",
      4: "Wednesday",
      5: "Thursday",
      6: "Friday",
      7: "Saturday"
    };
    
    // Initialize weekly revenue structure
    const weeklyRevenue = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      values: [0, 0, 0, 0, 0, 0, 0] // Start with zero revenue for each weekday
    };
    
    // Process MongoDB results into weekly revenue
    last30DaysRevenue.forEach(({ _id, totalRevenue }) => {
      const dayName = daysMap[_id.dayOfWeek]; // Get day name from mapping
      const index = weeklyRevenue.labels.indexOf(dayName); // Find index in array
      if (index !== -1) {
        weeklyRevenue.values[index] += totalRevenue; // Accumulate revenue for the weekday
      }
    });
    
    
    const orderCount = last30DaysRevenue.reduce((total, order) => total + order.orderCount, 0);
    const totalRevenue = last30DaysRevenue.reduce((total, order) => total + order.totalRevenue, 0);

    
    // const totalRevenue = lastMonthRevenue[0]?.totalRevenue || 0;
    // const orderCount = lastMonthRevenue[0]?.orderCount || 0;

    const totalUser = await User.find().countDocuments();
    const totalProduct = await Product.find({ isCustomize: false }).countDocuments();
    const totalProductCustom = await Product.find({ isCustomize: true }).countDocuments();
    const totalBlog = await Blog.find().countDocuments();
    const totalCoupon = await Coupon.find().countDocuments();

    const stats = [
      { title: 'Total Users', value: totalUser, trend: 12, Icon: 'ri ri-user-3-line', color: 'bg-blue-500' },
      { title: 'Revenue', value: formatCurrency(totalRevenue), trend: 8, Icon: 'ri ri-money-dollar-circle-line', color: 'bg-green-500' },
      { title: 'Orders', value: orderCount, trend: -3, Icon: 'ri ri-shopping-cart-2-line', color: 'bg-purple-500' },
      { title: 'Growth', value: '28.6%', trend: 15, Icon: 'ri ri-bar-chart-line', color: 'bg-orange-500' },
      { title: 'Total Products', value: totalProduct, trend: 5, Icon: 'ri ri-shopping-bag-3-line', color: 'bg-red-500' },
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
