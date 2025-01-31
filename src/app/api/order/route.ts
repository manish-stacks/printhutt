import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Address } from "@/models/addressModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Order from "@/models/orderModel";
// import { sendOrderConfirmationEmail } from "@/lib/mail/mailer";
import User from "@/models/userModel";
import { uploadImageOrder } from "@/lib/cloudinary";


connect();

export async function GET(request: NextRequest) {
  try {
    const { id, role } = await getDataFromToken(request);
    if (!id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1); // Ensure `page` is at least 1
    const limit = Math.min(
      Math.max(parseInt(url.searchParams.get("limit") || "10", 10), 1),
      100
    ); // Limit between 1 and 100
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";

    const query: {
      status?: boolean | string;
      userId?: string;
      orderId?: { $regex: string; $options: string };
    } = {};

    if (status) {
      query.status = status;
    }

    if (role !== "admin") {
      query.userId = String(id);
    }

    if (search) {
      query.orderId = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(query),
    ]);

    // Response with paginated data
    return NextResponse.json({
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const tokenData = await getDataFromToken(request);

    if (!tokenData.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userData = await User.findById(tokenData.id);

    if (!userData?.email) {
      return NextResponse.json(
        { message: "Email address is required to send order confirmation." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const itemData = await Promise.all(body.items.map(async (item) => {
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
          discountPrice: item.discountPrice
        };
      } else {
        const customData = item.custom_data;

        const updatedProductData = {
          ...customData,
          previewCanvas: await uploadImageOrder(customData.previewCanvas, 'customized preview canvas'),
          previewImage: customData?.previewImage && await uploadImageOrder(customData.previewImage, 'customized image'),
          previewImageTwo: customData?.previewImageTwo && await uploadImageOrder(customData.previewImageTwo, 'customized image')
        };

        // console.log(updatedProductData)
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
          discountPrice: item.discountPrice
        };
      }
    }));

    const timestamp = Date.now();

    const addressData = await Address.findById(body.address);

    const orderData = {
      orderId: `ORD-${timestamp}`,
      items: itemData,
      totalAmount: {
        discountPrice: body.totalPrice.discountPrice,
        shippingTotal: body.totalPrice.shippingTotal,
        totalPrice: body.totalPrice.totalPrice,
      },
      payAmt: body.paymentMethod === 'online' ? body.totalPrice.discountPrice : body.totalPrice.discountPrice * 0.20,
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
        email: userData.email
      },
      coupon: {
        code: body.couponCode,
        discountAmount: 0,
        discountType: "",
        isApplied: false,
      },
      totalquantity: body.getTotalItems,
      status: "pending",
      userId: tokenData.id,
      email: userData.email,
    };

    const order = new Order(orderData);
    await order.save();

    // console.log(order)
    // await sendOrderConfirmationEmail(orderData);

    return NextResponse.json({
      success: true,
      message: "Order saved successfully",
      order: {
        ...order._doc,
        user: userData
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
