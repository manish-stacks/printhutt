import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel";
import { uploadImage } from "@/lib/cloudinary";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/dbConfig/dbConfig";

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

    const name = formData.get("name")?.toString().trim();
    const slug = formData.get("slug")?.toString().trim();

    // Validation for required fields
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Upload the image
    const uploadResponse = await uploadImage(file, "categories", 60, 60);

    // Create a new category
    const category = new Category({
      name,
      slug,
      description: formData.get("description")?.toString() || "",
      metaKeywords: formData.get("metaKeywords")?.toString() || "",
      metaTitle: formData.get("metaTitle")?.toString() || "",
      metaDescription: formData.get("metaDescription")?.toString() || "",
      level: formData.get("level")?.toString() || "beginner",
      status: formData.get("status")?.toString() || "active",
      image: uploadResponse,
    });
    // console.log("category",category)
    // console.log("category", formData.get("metaTitle"))
    await category.save();

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /categories:", error); // Improved error logging
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

    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const skip = (page - 1) * limit;

    // Fetch categories with pagination and total count in a single query
    const [categories, total] = await Promise.all([
      Category.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Category.countDocuments(query),
    ]);

    // Return categories with pagination info
    return NextResponse.json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error in GET /categories:", error); // Improved error logging
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}
