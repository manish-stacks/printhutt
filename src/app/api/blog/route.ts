import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/blogModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/dbConfig/dbConfig";
import { uploadImage } from "@/lib/cloudinary";
import BlogCategory from "@/models/blogCategoryModel";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { role } = await getDataFromToken(req);
    if (role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("imageUrl");

    // File validation
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { success: false, message: "No valid file uploaded" },
        { status: 400 }
      );
    }

    const title = formData.get("title")?.toString().trim();
    const slug = formData.get("slug")?.toString().trim();

    // Validation for required fields
    if (!title || !slug) {
      return NextResponse.json(
        { success: false, message: "Title and slug are required" },
        { status: 400 }
      );
    }

    // Upload the image
    const uploadResponse = await uploadImage(file, "blogs", 800, 500);

    // Create a new blog
    const blog = new Blog({
      title,
      slug,
      category:formData.get("category")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      short_description:formData.get("short_description")?.toString() || "",
      metaKeywords: formData.get("metaKeywords")?.toString() || "",
      metaTitle: formData.get("metaTitle")?.toString() || "",
      metaDescription: formData.get("metaDescription")?.toString() || "",
      status: formData.get("status")?.toString() || "active",
      image: uploadResponse,
      author: formData.get("author")?.toString() || "",
    });
    // console.log("blog", blog);
   
    await blog.save();

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /blogs:", error); // Improved error logging
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}

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
      Blog.find(query).populate({ path: "category", model: BlogCategory }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Blog.countDocuments(query),
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
