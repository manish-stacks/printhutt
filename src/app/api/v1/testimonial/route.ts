import { NextResponse } from 'next/server';
import  dbConnect  from '@/dbConfig/dbConfig'
import Testimonials from '@/models/testimonialsModel';


await dbConnect();

export async function GET() {
    try {
        const query = Testimonials.find().sort({ createdAt: -1 }).limit(4);
        const testimonials = await query.lean();

        return NextResponse.json(
            { testimonials: testimonials, message: "Successfully fetched testimonials" },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error('Error fetching trending products:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}


