import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import ShippingInformation from '@/models/shippingInformationModel';


export async function GET() {
    try {
        await dbConnect();
        const shipping = await ShippingInformation.find({}, '_id shippingMethod shippingFee');
        return NextResponse.json({ message: 'Data fetched', shipping }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An unknown error occurred' },
            { status: 500 }
        );
    }
}
