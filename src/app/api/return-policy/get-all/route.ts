import { NextResponse } from 'next/server';
import  dbConnect  from '@/dbConfig/dbConfig'
import ReturnPolicy from '@/models/returnPolicyModule';
await dbConnect();


export async function GET() {
    try {
        const returnData = await ReturnPolicy.find().select('_id returnPeriod');

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
