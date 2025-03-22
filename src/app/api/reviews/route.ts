
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Review from '@/models/reviewModel';
import { reviewImage } from '@/lib/cloudinary';
import Product from '@/models/productModel';

const errorHandler = (message: string, status: number) => {
    return NextResponse.json({ error: message }, { status });
};

export async function POST(req: NextRequest) {

    try {
        await dbConnect();
        const userAgent = await getDataFromToken(req)
        if (!userAgent) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        const userId = userAgent.id
        const formData = await req.formData();
        const imagesRaw = formData.getAll('images');

        // console.log('imagesRaw',imagesRaw)
        const newReview = new Review({
            rating: formData.get('rating'),
            review: formData.get('review'),
            userId: userId,
            productId: formData.get('productId'),
        })

        if (imagesRaw.length > 0) {
            newReview.images = await Promise.all(
                imagesRaw.map(async (image) => {
                    if (typeof File !== 'undefined' && image instanceof File) {  
                        return reviewImage(image);
                    } else {
                        throw new Error('Invalid image file provided.');
                    }
                })
            )
        }

        const savedReview = await newReview.save();
        await Product.updateOne({ _id: formData.get('productId') }, { $push: { reviews: savedReview._id } }).exec();

        console.log(newReview)
        return NextResponse.json({
            success: true,
            message: 'Data inserted successfully',
            review:savedReview
        }, { status: 201 });
    } catch (error: unknown) {
        return errorHandler((error as Error).message, 500);
    }
}
