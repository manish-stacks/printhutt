import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Offer from '@/models/offerModel';
connect();


export async function GET() {
    try {
        const returnData = await Offer.find().select('_id offerTitle');

        return NextResponse.json(
            {
                message: 'data fetch',
                returnData: returnData
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
