import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { formatCurrency } from '@/helpers/helpers';
import Order from '@/models/orderModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Wishlist from '@/models/wishlistModel';
import { Address } from '@/models/addressModel';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { id } = await getDataFromToken(req)
    if (!id) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const totalOrders = await Order.countDocuments({ userId: id, status: "confirmed" })
    const totalAmount = await Order.aggregate([
      { 
        $match: { 
          status: { $in: ["confirmed", "shipped", "delivered"] }, 
          userId: id
        }
      },
      { 
        $group: { 
          _id: null, 
          totalAmount: { $sum: "$payAmt" } 
        }
      }
    ]);
    
    const totalAmountFormatted = formatCurrency(totalAmount[0]?.totalAmount || 0);

    const totalWishlist = await Wishlist.countDocuments({ userId: id })
    const totalAddress = await Address.countDocuments({ userId: id })
    const totalReview = 0
    const data = {
      totalOrders,
      totalAmount: totalAmountFormatted,
      totalWishlist,
      totalAddress,
      totalReview
    }
    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error: unknown) {
    console.error("Error in GET /api/dashboard:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
