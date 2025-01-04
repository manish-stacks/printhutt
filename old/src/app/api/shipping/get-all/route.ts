import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import ShippingInformation from '@/models/shippingInformationModel';
connect();


export async function GET() {
    try {
        const shipping = await ShippingInformation.find().select('_id shippingMethod shippingFee');

        return NextResponse.json(
            {
                message: 'data fetch',
                shipping: shipping
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
