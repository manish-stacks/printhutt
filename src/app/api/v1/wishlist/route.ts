import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Wishlist from '@/models/wishlistModel';

await dbConnect();

export async function POST(req: NextRequest) {
  try {
    const { id } = await getDataFromToken(req);
    if (!id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await req.json();

    let wishlist = await Wishlist.findOne({ userId: id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        userId: id,
        items: [{ productId }],
      });
      await wishlist.save();
    } else {
      const productExists = await Wishlist.findOne({
        userId: id,
        items: { $elemMatch: { productId } },
      });

      if (!productExists) {
        await Wishlist.updateOne(
          { userId: id },
          { $addToSet: { items: { productId } } }
        );
      } else {
        return NextResponse.json({ success: true, message: 'Product already in wishlist' }, { status: 200 });
      }
    }
    return NextResponse.json({ success: true, message: 'Product added to wishlist' }, { status: 201 });

  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    const { id } = await getDataFromToken(req);
    if (!id) {
      return NextResponse.json({ success: false, message: 'Not logged in', data: [] }, { status: 200 });
    }

    const wishlist = await Wishlist.findOne({ userId: id }).populate('items.productId');
    return NextResponse.json({ success: true, message: 'Data fetched successfully', data: wishlist }, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json({ success: false, message: (error as Error).message || 'Not logged in', data: [] }, { status: 200 });
    //return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}



