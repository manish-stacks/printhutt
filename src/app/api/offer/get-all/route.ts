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

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
