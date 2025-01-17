import { getDataFromToken } from "@/helpers/getDataFromToken";
import Wishlist from "@/models/wishlistModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const productId = id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    const userdata = await getDataFromToken(request);
    if (!userdata.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const wishlist = await Wishlist.findOne({ userId: userdata.id });
    
    if (!wishlist) {
      return NextResponse.json({ success: false, message: 'Product not found in wishlist' }, { status: 404 });
    }

    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);


    await wishlist.save();

    return NextResponse.json({ success: true, message: 'Wishlist item removed' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
