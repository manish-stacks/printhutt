import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import BlogPost from '@/models/blogModel';


export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const search = url.searchParams.get("search") || "";

    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const skip = (page - 1) * limit;

    // Fetch blogs with pagination and total count in a single query
    const [blogs, total] = await Promise.all([
      BlogPost.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      BlogPost.countDocuments(query),
    ]);

    // Return blogs with pagination info
    return NextResponse.json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error in GET /blogs:", error); // Improved error logging
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}