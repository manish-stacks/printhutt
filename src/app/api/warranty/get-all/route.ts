import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import WarrantyInformation from '@/models/warrantyInformationModel';


export async function GET() {
    try {
        await dbConnect();
        const warranty = await WarrantyInformation.find().select('_id warrantyType');

        return NextResponse.json(
            {
                message: 'Data fetched successfully',
                warranty
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching warranty information:', error);
        return NextResponse.json(
            { error: (error as Error).message || 'Failed to fetch data' },
            { status: 500 }
        );
    }
}
