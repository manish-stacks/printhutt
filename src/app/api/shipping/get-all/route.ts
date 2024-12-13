import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import ShippingInformation from '@/models/shippingInformationModel';
connect();


export async function GET() {
    try {
        const shipping = await ShippingInformation.find().select('_id shippingMethod');

        return NextResponse.json(
            {
                message: 'data fetch',
                shipping: shipping
            },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
