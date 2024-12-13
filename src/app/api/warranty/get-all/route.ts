import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import WarrantyInformation from '@/models/warrantyInformationModel';
connect();


export async function GET() {
    try {
        const warranty = await WarrantyInformation.find().select('_id warrantyType');

        return NextResponse.json(
            {
                message: 'data fetch',
                warranty: warranty
            },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
