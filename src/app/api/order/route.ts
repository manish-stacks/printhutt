import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import { Address } from "@/models/addressModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { uploadImageOrder } from "@/lib/cloudinary";
import { sendOrderConfirmationEmail } from "@/lib/mail/mailer";

export async function GET(request: NextRequest) {
  try {
    await dbConnect(); 

    const { id, role } = await getDataFromToken(request);
    if (!id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(url.searchParams.get("limit") || "10", 10), 1), 100);
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";

    const query: {
      status?: string;
      userId?: string;
      orderId?: { $regex: string; $options: string };
    } = {};

    if (status) query.status = status;
    if (role !== "admin") query.userId = String(id);
    if (search) query.orderId = { $regex: search, $options: "i" };

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); 

    const tokenData = await getDataFromToken(request);
    if (!tokenData.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userData = await User.findById(tokenData.id);
    if (!userData?.email) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 200 }
      );
    }

    const body = await request.json();
    let addressData = await Address.findById(body.address);
    if (!addressData) {
      addressData = await Address.findOne({ userId: tokenData.id });
      //return NextResponse.json({ success: false, message: "Address not found" }, { status: 404 });
    }

    const itemData = await Promise.all(
      body.items.map(async (item) => {
        if (!item.custom_data) {
          return {
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            quantity: item.quantity,
            sku: item.sku,
            product_image: item.product_image,
            price: item.price,
            discountType: item.discountType,
            discountPrice: item.discountPrice,
          };
        } else {
          const customData = item.custom_data;
          const updatedProductData = {
            ...customData,
            previewCanvas: await uploadImageOrder(customData.previewCanvas, "customized preview canvas"),
            previewImage: customData?.previewImage && await uploadImageOrder(customData.previewImage, "customized image"),
            previewImageTwo: customData?.previewImageTwo && await uploadImageOrder(customData.previewImageTwo, "customized image"),
          };

          return {
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            quantity: item.quantity,
            sku: item.sku,
            product_image: updatedProductData.previewCanvas.url,
            isCustomized: true,
            custom_data: updatedProductData,
            price: item.price,
            discountType: item.discountType,
            discountPrice: item.discountPrice,
          };
        }
      })
    );

    const timestamp = Date.now();

    const orderData = {
      orderId: `ORD-${timestamp}`,
      items: itemData,
      totalAmount: {
        totalPrice: body.totalPrice.totalPrice,
        discountPrice: body.totalPrice.discountPrice,
        shippingTotal: body.totalPrice.shippingTotal,
        coupon_discount: body.totalPrice.coupon_discount,
      },
      payAmt:
        body.paymentMethod === "online"
          ? body.payAmt.toFixed(2)
          : (body.payAmt * 0.2).toFixed(2),
      paymentType: body.paymentMethod,
      payment: {
        method: body.paymentMethod,
        transactionId: "",
        isPaid: false,
        paidAt: null,
      },
      offerId: null,
      shipping: {
        userName: addressData.fullName,
        addressLine: addressData.addressLine,
        city: addressData.city,
        state: addressData.state,
        postCode: addressData.postCode,
        mobileNumber: addressData.mobileNumber,
        email: userData.email,
      },
      coupon: {
        code: body.coupon?.code || "",
        discountAmount: body.coupon?.discountAmount || 0,
        discountType: body.coupon?.discountType || "",
        isApplied: body.coupon?.isApplied || false,
      },
      totalQuantity: body.getTotalItems || 0,
      status: "pending",
      userId: tokenData.id,
    };
    const order = new Order(orderData);
    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order saved successfully",
      order: {
        ...order._doc,
        user: userData,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
