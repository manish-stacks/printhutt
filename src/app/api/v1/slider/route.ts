import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Slider from '@/models/sliderModel';

connect();

export async function GET() {
    try {
        const query = Slider.find().sort({ level: -1 }).limit(4);
        const sliders = await query.lean();

        return NextResponse.json(
            { sliders: sliders,message:"kjhfkjasdhklfh" },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error('Error fetching trending products:', error);
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}


