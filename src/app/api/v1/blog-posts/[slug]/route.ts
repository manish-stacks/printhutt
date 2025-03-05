import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import BlogPost from '@/models/blogModel';

export async function GET(request: NextRequest, context: { params: { slug: string } }) {
    try {
        await dbConnect();
        // if (!context || !context.params || !context.params.slug) {
        //     return NextResponse.json({ success: false, message: "Invalid Blog Post" }, { status: 400 });
        // }
        const { slug } = await context.params;
        
        const blogPost = await BlogPost.findOne({ slug });
        console.log('slug', slug);
        if (!blogPost) return NextResponse.json({ error: "Blog Post not found" }, { status: 404 });

        const relatedBlogs = await BlogPost.find({
            //category: blogPost.category,
            _id: { $ne: blogPost._id },
        })
            //.populate('category')
            .sort({ createdAt: -1 })
            .limit(4);

        return NextResponse.json({ blogPost, relatedBlogs });

    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
        }
    }
}


