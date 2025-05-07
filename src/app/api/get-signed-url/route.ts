import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { sign_url } from "@/lib/cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
    const public_id = request.nextUrl.searchParams.get("public_id");

    if(!public_id) {
        return NextResponse.json({
            success: false,
            message: "public_id not found"
        });
    }
    try {

        const url = await sign_url(public_id!);
        console.log('public_id', url)
        return NextResponse.json({
            success: true,
            message: "success",
            url
        });

    } catch (error) {
        console.error(error)
    }
}