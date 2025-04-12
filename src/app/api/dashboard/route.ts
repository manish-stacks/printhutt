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
    const now = new Date();
    const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // Get total revenue (all time)
    // const totalRevenue = await Order.aggregate([
    //   { $match: { status: { $in: ["confirmed", "shipped", "delivered"] } } },
    //   { $group: { _id: null, totalRevenue: { $sum: "$totalAmount.discountPrice" } } },
    // ]).then(res => (res.length > 0 ? res[0].totalRevenue : 0));

    const totalEarnings = await Order.aggregate([
      {
        $match: {
          status: { $in: ["confirmed", "shipped", "delivered"] }
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: {
            $sum: {
              $subtract: [
                { $add: ["$totalAmount.discountPrice", "$totalAmount.shippingTotal"] },
                "$totalAmount.coupon_discount"
              ]
            }
          }
        }
      }
    ]).then(res => res.length > 0 ? res[0].totalEarnings : 0);

    // Get last month's revenue
    // const lastMonthRevenue = await Order.aggregate([
    //   {
    //     $match: {
    //       createdAt: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth },
    //       status: { $in: ["confirmed", "shipped", "delivered"] },
    //     },
    //   },
    //   { $group: { _id: null, lastMonthRevenue: { $sum: "$totalAmount.discountPrice" } } },
    // ]).then(res => (res.length > 0 ? res[0].lastMonthRevenue : 0));


    const lastMonthEarnings = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth },
          status: { $in: ["confirmed", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: null,
          lastMonthEarnings: {
            $sum: {
              $subtract: [
                { $add: ["$totalAmount.discountPrice", "$totalAmount.shippingTotal"] },
                "$totalAmount.coupon_discount",
              ],
            },
          },
        },
      },
    ]).then(res => (res.length > 0 ? res[0].lastMonthEarnings : 0));


    // Get weekly revenue
    // const revenue = await Order.aggregate([
    //   {
    //     $match: {
    //       createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
    //       status: { $in: ["confirmed", "shipped", "delivered"] },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: { dayOfWeek: { $dayOfWeek: "$createdAt" } },
    //       totalRevenue: { $sum: "$totalAmount.discountPrice" },
    //     },
    //   },
    // ]);

    // const daysMap = { 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday" };
    // const weeklyRevenue = { labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], values: [0, 0, 0, 0, 0, 0, 0] };
    // revenue.forEach(({ _id, totalRevenue }) => {
    //   const dayName = daysMap[_id.dayOfWeek];
    //   const index = weeklyRevenue.labels.indexOf(dayName);
    //   if (index !== -1) weeklyRevenue.values[index] += totalRevenue;
    // });

    const revenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
          status: { $in: ["confirmed", "shipped", "delivered"] },
        },
      },
      {
        $group: {
          _id: { dayOfWeek: { $dayOfWeek: "$createdAt" } },  // Group by the day of the week
          totalRevenue: { $sum: "$totalAmount.discountPrice" },  // Sum the revenue for that day
        },
      },
    ]);
    
    // Days map for conversion from MongoDB's dayOfWeek to actual days
    const daysMap = { 
      1: "Sunday", 
      2: "Monday", 
      3: "Tuesday", 
      4: "Wednesday", 
      5: "Thursday", 
      6: "Friday", 
      7: "Saturday" 
    };
    
    // Initialize the weeklyRevenue object with all days set to 0
    const weeklyRevenue = { 
      labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], 
      values: [0, 0, 0, 0, 0, 0, 0] 
    };
    
    // Loop through the revenue data and update the corresponding day's revenue
    revenue.forEach(({ _id, totalRevenue }) => {
      const dayName = daysMap[_id.dayOfWeek];
      const index = weeklyRevenue.labels.indexOf(dayName);  // Find the index for the day
      if (index !== -1) weeklyRevenue.values[index] += totalRevenue;  // Add revenue to the appropriate day
    });
    
    

    // Fetch other stats
    const totalUser = await User.countDocuments();
    const totalProduct = await Product.countDocuments({ isCustomize: false });
    const totalProductCustom = await Product.countDocuments({ isCustomize: true });
    const totalBlog = await Blog.countDocuments();
    const totalCoupon = await Coupon.countDocuments();
    const totalCart = await SessionCart.countDocuments();

    // Dynamic data calculations
    const initiateCheckout = await User.countDocuments({
      $or: [
        { createdAt: { $gte: startOfToday, $lt: endOfToday } },
        { updatedAt: { $gte: startOfToday, $lt: endOfToday } },
      ],
    });

    const dailyUsers = await User.countDocuments({
      createdAt: { $gte: startOfToday, $lt: endOfToday },
    });

    const totalOrders = await Order.countDocuments({
      status: { $in: ["confirmed", "shipped", "delivered"] }
    });
    const dailyOrders = await Order.countDocuments({
      status: { $in: ["confirmed", "shipped", "delivered"] },
      createdAt: { $gte: startOfToday, $lt: endOfToday },
    });

    const dailyCartVisitors = await SessionCart.countDocuments({
      createdAt: { $gte: startOfToday, $lt: endOfToday },
    });

    const stats = [
      { title: 'Total Users', value: totalUser, trend:  Math.floor(Math.random() * totalUser), Icon: 'ri ri-user-3-line', color: 'bg-blue-500' },
      { title: 'Revenue', value: formatCurrency(totalEarnings), trend: formatCurrency(lastMonthEarnings), Icon: 'ri ri-money-dollar-circle-line', color: 'bg-green-500' },
      { title: 'Orders', value: totalOrders, trend:  Math.floor(Math.random() * totalOrders), Icon: 'ri ri-shopping-cart-2-line', color: 'bg-purple-500' },
      { title: 'Cart', value: totalCart, trend:  Math.floor(Math.random() * totalCart), Icon: 'ri ri-bar-chart-line', color: 'bg-orange-500' },
      { title: 'Pre Products', value: totalProduct, trend:  Math.floor(Math.random() * totalProduct), Icon: 'ri ri-shopping-bag-3-line', color: 'bg-red-500' },
      { title: 'Customized Products', value: totalProductCustom, trend:  Math.floor(Math.random() * totalProductCustom), Icon: 'ri ri-shopping-bag-3-line', color: 'bg-yellow-500' },
      { title: 'Blog Posts', value: totalBlog, trend:  Math.floor(Math.random() * totalBlog), Icon: 'ri ri-news-line', color: 'bg-indigo-500' },
      { title: 'Coupons', value: totalCoupon, trend:  Math.floor(Math.random() * totalCoupon), Icon: 'ri ri-gift-fill', color: 'bg-indigo-500' },
      { title: 'Initiate Checkout', value: initiateCheckout, trend:  Math.floor(Math.random() * initiateCheckout), Icon: 'ri ri-file-list-3-fill', color: 'bg-indigo-500' },
      { title: 'Daily Users', value: dailyUsers, trend:  Math.floor(Math.random() * dailyUsers), Icon: 'ri ri-file-list-3-fill', color: 'bg-indigo-500' },
      { title: 'Daily Orders', value: dailyOrders, trend:  Math.floor(Math.random() * dailyOrders), Icon: 'ri ri-file-list-3-fill', color: 'bg-indigo-500' },
      { title: 'Daily Cart Visitors', value: dailyCartVisitors, trend: Math.floor(Math.random() * dailyCartVisitors), Icon: 'ri ri-file-list-3-fill', color: 'bg-indigo-500' },
    ];

    const sessionData = await SessionCart.find().sort({ createdAt: -1 }).limit(6).populate("productId");

    return NextResponse.json({ success: true, totalEarnings, lastMonthEarnings, weeklyRevenue, stats, sessionData }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/dashboard:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

