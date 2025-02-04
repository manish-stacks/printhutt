import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Offer from '@/models/offerModel';

export async function GET() {
    try {
        await dbConnect(); 

        const offers = await Offer.find().select('_id offerTitle');

        return NextResponse.json(
            {
                success: true,
                message: 'Data fetched successfully',
                data: offers,
            },
            { status: 200 } 
        );

    } catch (error) {
        console.error('Error fetching offers:', error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
