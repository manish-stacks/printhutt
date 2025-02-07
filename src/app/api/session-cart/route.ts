import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import SessionCart from "@/models/session_carts.model";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await request.json();
    const { product_id } = reqBody;

    if (!product_id) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const addToSessionCart = new SessionCart({
      productId: product_id,
    });

    await addToSessionCart.save();
    return NextResponse.json(
      { message: "Product added to cart" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { message: "An error occurred while adding product to cart" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const sessionCart = await SessionCart.find({}).populate("productId");

    if (sessionCart.length === 0) {
      return new NextResponse(null, { status: 204 }); 
    }

    return NextResponse.json(
      { message: "Cart retrieved successfully", data: sessionCart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching cart data" },
      { status: 500 }
    );
  }
}