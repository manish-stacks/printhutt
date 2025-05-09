import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import { Address } from "@/models/addressModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import { uploadImageOrder } from "@/lib/cloudinary";
// import { sendOrderConfirmationEmail } from "@/lib/mail/mailer";
import {  decompress } from 'lz-string';


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
      status?: string | { $in: string[] };
      userId?: string;
      orderId?: { $regex: string; $options: string };
    } = {};

    if (status !== "pending") {
      query.status = { $in: ['confirmed', 'shipped', 'delivered', 'cancelled', 'returned', 'progress'] };
    } else if (status) {
      query.status = status;
    }




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

    const body = await request.json();
    const tokenData = await getDataFromToken(request);

    if (!tokenData?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userData = await User.findById(tokenData.id);

    if (!userData) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    
    const invalidUsernames = ['', 'user', 'guest'];
    if (!invalidUsernames.includes(userData.username)) {
      userData.username = body.address.fullName;
    }

    if (userData.email !== '') {
      userData.email = body.address.email;
    }
    await userData.save();


    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items in the order." },
        { status: 200 }
      );
    }


    const addressData = new Address({
      userId: tokenData.id,
      fullName: body.address.name,
      mobileNumber: body.address.number,
      email: body.address.email,
      addressLine: body.address.address,
      city: body.address.city,
      state: body.address.state,
      postCode: body.address.postCode,
      addressType: body.address.addressType,
    });


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
            previewCanvas: customData?.previewCanvas && await uploadImageOrder(customData.previewCanvas, "customized preview canvas"),
            previewImage: customData?.previewImage && await uploadImageOrder(customData.previewImage, "customized image"),
            previewImageTwo: customData?.previewImageTwo && await uploadImageOrder(customData.previewImageTwo, "customized image"),
            previewImageThree: customData?.previewImageThree && await uploadImageOrder(customData.previewImageThree, "customized image"),
            previewImageFour: customData?.previewImageFour && await uploadImageOrder(customData.previewImageFour, "customized image"),
          };

          return {
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            quantity: item.quantity,
            sku: item.sku,
            product_image: customData?.previewCanvas ? updatedProductData.previewCanvas.url : item.product_image,
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
          ? Number(body.payAmt)
          : Number(body.payAmt * 0.2),
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


/*
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const tokenData = await getDataFromToken(request);

    if (!tokenData?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userData = await User.findById(tokenData.id);
    if (!userData?.email) {
      return NextResponse.json(
        { success: false, message: "Email address is required." },
        { status: 200 }
      );
    }
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items in the order." },
        { status: 200 }
      );
    }
 
    if (userData.couponCollection.includes(body.coupon.id)) {
      return NextResponse.json(
        { success: false, message: "Coupon already used." },
        { status: 200 }
      );
    }
    

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
            previewCanvas: customData?.previewCanvas && await uploadImageOrder(customData.previewCanvas, "customized preview canvas"),
            previewImage: customData?.previewImage && await uploadImageOrder(customData.previewImage, "customized image"),
            previewImageTwo: customData?.previewImageTwo && await uploadImageOrder(customData.previewImageTwo, "customized image"),
            previewImageThree: customData?.previewImageThree && await uploadImageOrder(customData.previewImageThree, "customized image"),
            previewImageFour: customData?.previewImageFour && await uploadImageOrder(customData.previewImageFour, "customized image"),
          };

          return {
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            quantity: item.quantity,
            sku: item.sku,
            product_image: customData?.previewCanvas ? updatedProductData.previewCanvas.url : item.product_image,
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
          ? Number(body.payAmt)
          : Number(body.payAmt * 0.2),
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


    userData.couponCollection = userData.couponCollection || [];
    if (body.coupon?.code && !userData.couponCollection.includes(body.coupon.id)) {
      userData.couponCollection.push(body.coupon.id);
      await userData.save();
    }

    //console.log("userData.couponCollection", userData.couponCollection);

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
*/